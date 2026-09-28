import { SANDBOX_SOURCE, WEB_PRELUDE } from './sandbox-source';
import { DEFAULT_TIMEOUT_MS, type RunOptions, type RunResult, type RunnerWorker } from './types';

/** A fresh Web Worker built from the sandbox source. No separate asset to ship. */
function webWorkerFactory(): RunnerWorker {
  const blob = new Blob([WEB_PRELUDE + SANDBOX_SOURCE], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);
  URL.revokeObjectURL(url);
  return {
    post: (msg) => worker.postMessage(msg),
    onMessage: (cb) => {
      worker.onmessage = (e) => cb(e.data);
    },
    terminate: () => worker.terminate(),
  };
}

/**
 * Run the learner's JavaScript in a worker and collect what it printed.
 *
 * Every run gets its own worker, and a run that overstays its budget has that
 * worker killed. That is why an infinite loop costs three seconds rather than
 * the whole window: the loop is not on the thread drawing the interface, and a
 * killed worker cannot poison the next run.
 */
export function runJs(src: string, options: RunOptions = {}): Promise<RunResult> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const create = options.createWorker ?? webWorkerFactory;

  return new Promise<RunResult>((resolve) => {
    const logs: string[] = [];
    let settled = false;
    let worker: RunnerWorker;

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

    const timer = setTimeout(() => finish({ logs, error: null, timedOut: true }), timeoutMs);

    try {
      worker = create();
    } catch (e) {
      clearTimeout(timer);
      resolve({ logs, error: String(e), timedOut: false });
      return;
    }

    worker.onMessage((raw) => {
      const m = raw as { t?: string; v?: string; error?: string | null };
      if (m?.t === 'log') logs.push(m.v ?? '');
      else if (m?.t === 'done') finish({ logs, error: m.error ?? null, timedOut: false });
    });

    worker.post({ src });
  });
}
