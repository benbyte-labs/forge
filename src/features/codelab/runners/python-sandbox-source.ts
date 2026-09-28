/**
 * The Python sandbox that runs inside a worker.
 *
 * Booting Pyodide takes seconds, so the worker announces `ready` the moment the
 * interpreter is up; the orchestrator only then applies the short execution
 * budget that catches infinite loops.
 */
export const PY_SANDBOX_SOURCE = `
let pyodidePromise = null;

function send(m) { POST(m); }

ONMESSAGE(async function (data) {
  try {
    if (!pyodidePromise) pyodidePromise = LOADPY();
    const py = await pyodidePromise;
    send({ t: 'ready' });

    py.setStdout({ batched: function (s) { send({ t: 'log', v: s }); } });
    py.setStderr({ batched: function (s) { send({ t: 'log', v: s }); } });

    try {
      // A fresh namespace per run: the interpreter is reused for speed, but
      // nothing a previous run defined leaks into this one.
      const globals = py.globals.get('dict')();
      await py.runPythonAsync(data.src, { globals: globals });
      globals.destroy();
      send({ t: 'done', error: null });
    } catch (e) {
      const msg = String(e && e.message ? e.message : e);
      const lines = msg.trim().split('\\n');
      send({ t: 'done', error: lines[lines.length - 1] || msg });
    }
  } catch (e) {
    send({ t: 'done', error: 'Python: ' + String(e && e.message ? e.message : e) });
  }
});
`;

/** Loads Pyodide from the files bundled with the app — never from a CDN. */
export const PY_WEB_PRELUDE = `
importScripts('/pyodide/pyodide.js');
const POST = function (m) { self.postMessage(m); };
const ONMESSAGE = function (f) { self.onmessage = function (e) { f(e.data); }; };
const LOADPY = function () { return loadPyodide({ indexURL: '/pyodide/' }); };
`;

/** The same sandbox on a Node worker thread, for the tests. */
export const PY_NODE_PRELUDE = `
const { parentPort } = require('worker_threads');
const { loadPyodide } = require('pyodide');
const POST = function (m) { parentPort.postMessage(m); };
const ONMESSAGE = function (f) { parentPort.on('message', f); };
const LOADPY = function () { return loadPyodide(); };
`;
