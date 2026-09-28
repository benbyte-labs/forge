/** What a run produced. Shared by the JavaScript and the Python runner. */
export interface RunResult {
  logs: string[];
  error: string | null;
  timedOut: boolean;
}

/**
 * The bit of a worker the runner needs.
 *
 * Abstracting it keeps the runner testable against a real worker thread in
 * Node, where jsdom offers none, without the production path changing shape.
 */
export interface RunnerWorker {
  post(msg: unknown): void;
  onMessage(cb: (m: unknown) => void): void;
  terminate(): void;
}

export type WorkerFactory = () => RunnerWorker;

export interface RunOptions {
  timeoutMs?: number;
  createWorker?: WorkerFactory;
}

export const DEFAULT_TIMEOUT_MS = 3000;
export const LOG_CAP = 1000;
