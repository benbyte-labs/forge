import { Worker } from 'node:worker_threads';
import { NODE_PRELUDE, SANDBOX_SOURCE } from '../runners/sandbox-source';
import type { RunnerWorker } from '../runners/types';

/**
 * Run the very same sandbox source on a Node worker thread.
 *
 * jsdom has no Web Workers, and a hand-written fake could not prove that an
 * infinite loop is actually killed. A real thread can.
 */
export function nodeWorkerFactory(): RunnerWorker {
  const worker = new Worker(NODE_PRELUDE + SANDBOX_SOURCE, { eval: true });
  worker.unref();
  return {
    post: (msg) => worker.postMessage(msg),
    onMessage: (cb) => worker.on('message', (m) => cb(m)),
    terminate: () => void worker.terminate(),
  };
}
