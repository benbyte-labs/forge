import type { Check } from '../../content/types';
import type { RunResult } from './runners/types';

export type RunFn = (src: string) => Promise<RunResult>;

export interface CheckOutcome {
  passed: boolean;
  /** Labels of the checks that did not pass, in the order they were declared. */
  failures: string[];
  timedOut: boolean;
  error: string | null;
  logs: string[];
}

const MARKER = '__forge_check__';

/**
 * Decide whether the learner's code actually solves the task.
 *
 * The point is that the checks run the code rather than read it: a solution
 * that looks right but does not work fails, and a solution that looks nothing
 * like the sample answer but works, passes.
 */
export async function runChecks(src: string, checks: Check[], run: RunFn): Promise<CheckOutcome> {
  const first = await run(src);
  const output = first.logs.join('\n');
  const failures: string[] = [];

  // Code that crashed or ran away solved nothing, whatever the checks say.
  if (first.error || first.timedOut) {
    return {
      passed: false,
      failures: checks.map((c) => c.label),
      timedOut: first.timedOut,
      error: first.error,
      logs: first.logs,
    };
  }

  for (const check of checks) {
    switch (check.k) {
      case 'output':
        if (!output.includes(check.contains)) failures.push(check.label);
        break;

      case 'outputEquals':
        if (output.trim() !== check.value.trim()) failures.push(check.label);
        break;

      case 'calls': {
        const probe = `${src}\n;console.log(${JSON.stringify(MARKER)} + JSON.stringify(${check.fn}(${check.args
          .map((a) => JSON.stringify(a))
          .join(', ')})));`;
        const r = await run(probe);
        const line = r.logs.find((l) => l.startsWith(MARKER));
        if (r.error || r.timedOut || !line) {
          failures.push(check.label);
          break;
        }
        if (line.slice(MARKER.length) !== JSON.stringify(check.equals)) failures.push(check.label);
        break;
      }

      case 'mission':
        // A mission is decided by the Robot Lab against the simulated run, not
        // by the code runner. Here it counts as not yet met.
        failures.push(check.label);
        break;
    }
  }

  return { passed: failures.length === 0, failures, timedOut: false, error: null, logs: first.logs };
}
