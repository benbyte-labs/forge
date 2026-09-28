import { PY_SANDBOX_SOURCE, PY_WEB_PRELUDE } from './python-sandbox-source';
import { DEFAULT_TIMEOUT_MS, type RunOptions, type RunResult, type RunnerWorker, type WorkerFactory } from './types';

/** Pyodide needs room to start; after that the normal budget applies. */
export const PY_BOOT_TIMEOUT_MS = 90_000;

function pyWebWorkerFactory(): RunnerWorker {
  const blob = new Blob([PY_WEB_PRELUDE + PY_SANDBOX_SOURCE], { type: 'text/javascript' });
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

/** The run currently in flight, which the worker's messages are routed to. */
interface ActiveRun {
  logs: string[];
  settle(result: RunResult, kill: boolean): void;
  onReady(): void;
}

/**
 * A Python interpreter that stays alive between runs.
 *
 * Booting Pyodide costs seconds. Throwing the interpreter away after every run
 * would make each edit-run cycle painful, so the worker is kept and only
 * destroyed when a run has to be killed — and each run still executes in a
 * fresh namespace, so nothing leaks from one attempt to the next.
 */
export class PyRunner {
  private worker: RunnerWorker | null = null;
  private booted = false;
  private active: ActiveRun | null = null;

  constructor(private readonly createWorker: WorkerFactory = pyWebWorkerFactory) {}

  /** True once an interpreter is up, so the UI can stop saying "starting". */
  get isBooted(): boolean {
    return this.booted;
  }

  dispose() {
    this.worker?.terminate();
    this.worker = null;
    this.booted = false;
    this.active = null;
  }

  /**
   * The worker outlives any single run, so its message handler is installed
   * once and always writes into whichever run is currently in flight. Binding
   * it to one run's closure would send the second run's output to the first.
   */
  private ensureWorker(): RunnerWorker | null {
    if (this.worker) return this.worker;
    try {
      this.worker = this.createWorker();
    } catch {
      return null;
    }
    this.worker.onMessage((raw) => {
      const m = raw as { t?: string; v?: string; error?: string | null };
      const run = this.active;
      if (!run) return;
      if (m?.t === 'ready') run.onReady();
      else if (m?.t === 'log') run.logs.push(m.v ?? '');
      else if (m?.t === 'done') run.settle({ logs: run.logs, error: m.error ?? null, timedOut: false }, false);
    });
    return this.worker;
  }

  run(src: string, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<RunResult> {
    if (this.active) {
      return Promise.resolve({ logs: [], error: 'Python is already running', timedOut: false });
    }

    return new Promise<RunResult>((resolve) => {
      const logs: string[] = [];
      let settled = false;

      const settle = (result: RunResult, kill: boolean) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        this.active = null;
        if (kill) this.dispose();
        resolve(result);
      };

      let timer = setTimeout(
        () => settle({ logs, error: null, timedOut: true }, true),
        this.booted ? timeoutMs : PY_BOOT_TIMEOUT_MS,
      );

      this.active = {
        logs,
        settle,
        onReady: () => {
          this.booted = true;
          clearTimeout(timer);
          timer = setTimeout(() => settle({ logs, error: null, timedOut: true }, true), timeoutMs);
        },
      };

      const worker = this.ensureWorker();
      if (!worker) {
        settle({ logs, error: 'Could not start the Python worker', timedOut: false }, false);
        return;
      }
      worker.post({ src });
    });
  }
}

let shared: PyRunner | null = null;

/** The app-wide interpreter. */
export function pythonRunner(): PyRunner {
  if (!shared) shared = new PyRunner();
  return shared;
}

export function runPython(src: string, options: RunOptions = {}): Promise<RunResult> {
  const runner = options.createWorker ? new PyRunner(options.createWorker) : pythonRunner();
  return runner.run(src, options.timeoutMs);
}
