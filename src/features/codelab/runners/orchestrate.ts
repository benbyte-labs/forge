import { DEFAULT_TIMEOUT_MS, type RunResult, type RunnerWorker, type WorkerFactory } from './types';

interface OrchestrateOptions {
  createWorker: WorkerFactory;
  timeoutMs?: number;
  /**
   * A longer budget that applies until the worker reports it is ready. Booting
   * a Python interpreter takes seconds, and killing it as if it were an
   * infinite loop would make Python unusable on its first run.
   */
  readyTimeoutMs?: number;
}

/**
 * Drive one worker run: send the source, collect the logs, and kill the worker
 * if it overstays. Shared by the JavaScript and Python runners so both behave
 * the same way when the learner writes a loop that never ends.
 */
export function orchestrate(src: string, options: OrchestrateOptions): Promise<RunResult> {
  const execTimeout = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const bootTimeout = options.readyTimeoutMs ?? execTimeout;

  return new Promise<RunResult>((resolve) => {
    const logs: string[] = [];
    let settled = false;
    let worker: RunnerWorker;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const arm = (ms: number) => {
      clearTimeout(timer);
      timer = setTimeout(() => finish({ logs, error: null, timedOut: true }), ms);
    };

    const finish = (result: RunResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      try {
        worker.terminate();
      } catch {
        /* already gone */
      }
      resolve(result);
    };

    arm(bootTimeout);

    try {
      worker = options.createWorker();
    } catch (e) {
      clearTimeout(timer);
      resolve({ logs, error: String(e), timedOut: false });
      return;
    }

    worker.onError?.((message) => finish({ logs, error: message, timedOut: false }));

    worker.onMessage((raw) => {
      const m = raw as { t?: string; v?: string; error?: string | null };
      if (m?.t === 'ready') arm(execTimeout);
      else if (m?.t === 'log') logs.push(m.v ?? '');
      else if (m?.t === 'done') finish({ logs, error: m.error ?? null, timedOut: false });
    });

    worker.post({ src });
  });
}
