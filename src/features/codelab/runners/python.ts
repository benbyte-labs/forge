import type { RunOptions, RunResult } from './types';

/** Replaced by the Pyodide-backed runner in the next task. */
export async function runPython(_src: string, _options: RunOptions = {}): Promise<RunResult> {
  return { logs: [], error: 'Python runner not installed yet', timedOut: false };
}
