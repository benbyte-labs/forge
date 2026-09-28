import { describe, expect, it } from 'vitest';
import { runJs } from '../runners/js';
import { nodeWorkerFactory } from './node-worker';

/** Run against a real worker thread, so termination is real termination. */
const opts = { createWorker: nodeWorkerFactory };

describe('runJs', () => {
  it('captures console output', async () => {
    const r = await runJs('console.log("szia"); console.log(1 + 1);', opts);
    expect(r.logs).toEqual(['szia', '2']);
    expect(r.error).toBeNull();
    expect(r.timedOut).toBe(false);
  });

  it('formats objects and arrays readably', async () => {
    const r = await runJs('console.log([1,2]); console.log({a:1});', opts);
    expect(r.logs[0]).toContain('1');
    expect(r.logs[1]).toContain('a');
  });

  it('reports a syntax error instead of throwing', async () => {
    const r = await runJs('function (', opts);
    expect(r.error).toMatch(/SyntaxError|Unexpected/);
  });

  it('reports a runtime error with its message', async () => {
    const r = await runJs('null.x', opts);
    expect(r.error).toContain('TypeError');
  });

  it('terminates an infinite loop within the time budget', async () => {
    const started = Date.now();
    const r = await runJs('while (true) {}', { ...opts, timeoutMs: 500 });
    expect(r.timedOut).toBe(true);
    expect(Date.now() - started).toBeLessThan(3000);
  });

  it('stays usable after a timeout', async () => {
    await runJs('while (true) {}', { ...opts, timeoutMs: 300 });
    const r = await runJs('console.log("még élek")', opts);
    expect(r.logs).toEqual(['még élek']);
  });

  it('caps runaway output instead of growing without bound', async () => {
    const r = await runJs('for (let i = 0; i < 200000; i++) console.log(i);', { ...opts, timeoutMs: 4000 });
    expect(r.logs.length).toBeLessThanOrEqual(1000);
  }, 10000);

  it('returns an empty log list for code that prints nothing', async () => {
    const r = await runJs('const x = 1 + 1;', opts);
    expect(r.logs).toEqual([]);
    expect(r.error).toBeNull();
  });
});
