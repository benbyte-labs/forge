import { orchestrate } from './orchestrate';
import { SANDBOX_SOURCE, WEB_PRELUDE } from './sandbox-source';
import type { RunOptions, RunResult, RunnerWorker } from './types';

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
  return orchestrate(src, {
    createWorker: options.createWorker ?? webWorkerFactory,
    timeoutMs: options.timeoutMs,
  });
}
