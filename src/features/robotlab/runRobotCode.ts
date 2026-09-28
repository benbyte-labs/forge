import type { RobotRunRequest, RobotRunResult } from './robot.worker';
import type { World } from './rover';

export const ROBOT_TIMEOUT_MS = 4000;

export interface RobotRunOptions {
  timeoutMs?: number;
  /** Supplied by tests; production uses the bundled worker. */
  createWorker?: () => Worker;
}

function defaultWorker(): Worker {
  return new Worker(new URL('./robot.worker.ts', import.meta.url), { type: 'module' });
}

/**
 * Run the learner's robot program and hand back everything the robot did.
 *
 * The whole simulation happens inside the worker, so a program that loops
 * forever costs a few seconds and a terminated worker rather than a frozen
 * window — and the result is a complete trace the lab can replay and the
 * mission checks can judge.
 */
export function runRobotCode(
  src: string,
  world: World,
  machine: 'rover' | 'arm',
  options: RobotRunOptions = {},
): Promise<RobotRunResult & { timedOut: boolean }> {
  const timeoutMs = options.timeoutMs ?? ROBOT_TIMEOUT_MS;

  return new Promise((resolve) => {
    let settled = false;
    let worker: Worker;

    const finish = (result: RobotRunResult & { timedOut: boolean }) => {
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

    const timer = setTimeout(
      () => finish({ logs: [], error: null, trace: [], poses: [], timedOut: true }),
      timeoutMs,
    );

    try {
      worker = (options.createWorker ?? defaultWorker)();
    } catch (e) {
      clearTimeout(timer);
      resolve({ logs: [], error: String(e), trace: [], poses: [], timedOut: false });
      return;
    }

    worker.onmessage = (e: MessageEvent<RobotRunResult>) => finish({ ...e.data, timedOut: false });
    worker.onerror = (e) => finish({ logs: [], error: e.message || 'worker failed', trace: [], poses: [], timedOut: false });

    const request: RobotRunRequest = { src, world, machine };
    worker.postMessage(request);
  });
}
