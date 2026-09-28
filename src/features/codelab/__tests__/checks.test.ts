import { describe, expect, it } from 'vitest';
import type { Check } from '../../../content/types';
import { runChecks } from '../checks';
import { runJs } from '../runners/js';
import { nodeWorkerFactory } from './node-worker';

const run = (src: string) => runJs(src, { createWorker: nodeWorkerFactory, timeoutMs: 3000 });

describe('runChecks', () => {
  it('passes an output check when the text appears', async () => {
    const checks: Check[] = [{ k: 'output', contains: 'Rover', label: 'prints the name' }];
    const r = await runChecks('console.log("Rover 42")', checks, run);
    expect(r.passed).toBe(true);
    expect(r.failures).toEqual([]);
  });

  it('fails an output check and names what was missing', async () => {
    const checks: Check[] = [{ k: 'output', contains: 'Rover', label: 'prints the name' }];
    const r = await runChecks('console.log("nothing")', checks, run);
    expect(r.passed).toBe(false);
    expect(r.failures).toEqual(['prints the name']);
  });

  it('requires every check to pass', async () => {
    const checks: Check[] = [
      { k: 'output', contains: 'a', label: 'has a' },
      { k: 'output', contains: 'zzz', label: 'has zzz' },
    ];
    const r = await runChecks('console.log("a")', checks, run);
    expect(r.passed).toBe(false);
    expect(r.failures).toEqual(['has zzz']);
  });

  it('compares the whole output for outputEquals, ignoring trailing space', async () => {
    const checks: Check[] = [{ k: 'outputEquals', value: '1\n2', label: 'prints 1 then 2' }];
    expect((await runChecks('console.log(1); console.log(2);', checks, run)).passed).toBe(true);
    expect((await runChecks('console.log(2); console.log(1);', checks, run)).passed).toBe(false);
  });

  it('calls a function the learner defined and compares the result', async () => {
    const checks: Check[] = [{ k: 'calls', fn: 'double', args: [4], equals: 8, label: 'double(4) is 8' }];
    expect((await runChecks('function double(n){return n*2}', checks, run)).passed).toBe(true);
    expect((await runChecks('function double(n){return n+2}', checks, run)).passed).toBe(false);
  });

  it('reports a failure rather than a pass when the code errored', async () => {
    const checks: Check[] = [{ k: 'output', contains: 'x', label: 'prints x' }];
    const r = await runChecks('null.boom', checks, run);
    expect(r.passed).toBe(false);
  });

  it('reports a failure when the code timed out', async () => {
    const checks: Check[] = [{ k: 'output', contains: 'x', label: 'prints x' }];
    const r = await runChecks('while(true){}', checks, (s) =>
      runJs(s, { createWorker: nodeWorkerFactory, timeoutMs: 300 }),
    );
    expect(r.passed).toBe(false);
    expect(r.timedOut).toBe(true);
  });

  it('treats a mission check as not decidable here', async () => {
    const checks: Check[] = [{ k: 'mission', mission: 'reach-goal', label: 'reaches the goal' }];
    const r = await runChecks('console.log(1)', checks, run);
    expect(r.passed).toBe(false);
    expect(r.failures).toEqual(['reaches the goal']);
  });
});
