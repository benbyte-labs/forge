import { Worker } from 'node:worker_threads';
import { describe, expect, it } from 'vitest';
import { PY_NODE_PRELUDE, PY_SANDBOX_SOURCE } from '../runners/python-sandbox-source';
import { PyRunner, runPython } from '../runners/python';
import type { RunnerWorker } from '../runners/types';

/** The same Python sandbox on a real Node worker thread. */
function pyNodeWorker(): RunnerWorker {
  const worker = new Worker(PY_NODE_PRELUDE + PY_SANDBOX_SOURCE, { eval: true });
  worker.unref();
  return {
    post: (msg) => worker.postMessage(msg),
    onMessage: (cb) => worker.on('message', (m) => cb(m)),
    terminate: () => void worker.terminate(),
  };
}

const opts = { createWorker: pyNodeWorker };

describe('runPython', () => {
  it(
    'captures print output',
    async () => {
      const r = await runPython('print("szia")\nprint(2 ** 8)', opts);
      expect(r.error).toBeNull();
      expect(r.logs.join('\n')).toContain('szia');
      expect(r.logs.join('\n')).toContain('256');
    },
    120_000,
  );

  it(
    'reports a python error rather than throwing',
    async () => {
      const r = await runPython('1 / 0', opts);
      expect(r.error).toContain('ZeroDivisionError');
    },
    120_000,
  );

  it(
    'terminates an infinite loop',
    async () => {
      const r = await runPython('while True: pass', { ...opts, timeoutMs: 3000 });
      expect(r.timedOut).toBe(true);
    },
    120_000,
  );

  it(
    'reuses the interpreter across runs instead of rebooting it',
    async () => {
      const runner = new PyRunner(pyNodeWorker);
      const first = Date.now();
      await runner.run('print(1)');
      const bootMs = Date.now() - first;

      const second = Date.now();
      const r = await runner.run('print(2)');
      const reuseMs = Date.now() - second;

      expect(r.logs.join()).toContain('2');
      expect(reuseMs).toBeLessThan(Math.max(500, bootMs / 2));
      runner.dispose();
    },
    120_000,
  );

  it(
    'gives each run a fresh namespace',
    async () => {
      const runner = new PyRunner(pyNodeWorker);
      await runner.run('secret = 42');
      const r = await runner.run('print(secret)');
      expect(r.error).toContain('NameError');
      runner.dispose();
    },
    120_000,
  );

  it(
    'recovers after a run had to be killed',
    async () => {
      const runner = new PyRunner(pyNodeWorker);
      await runner.run('print(1)');
      const killed = await runner.run('while True: pass', 2000);
      expect(killed.timedOut).toBe(true);
      const after = await runner.run('print("alive")');
      expect(after.logs.join()).toContain('alive');
      runner.dispose();
    },
    180_000,
  );
});
