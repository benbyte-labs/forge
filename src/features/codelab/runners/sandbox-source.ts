import { LOG_CAP } from './types';

/**
 * The code that runs inside the worker.
 *
 * It is kept as a source string rather than a module so the very same sandbox
 * runs in a browser Web Worker and in a Node worker thread — the tests use the
 * latter, and a sandbox that differed between the two would be untested where
 * it matters.
 */
export const SANDBOX_SOURCE = `
const LOG_CAP = ${LOG_CAP};
let logged = 0;

function fmt(v) {
  if (typeof v === 'string') return v;
  if (v === null) return 'null';
  if (v === undefined) return 'undefined';
  if (typeof v === 'bigint') return v.toString() + 'n';
  if (typeof v === 'function') return '[function ' + (v.name || 'anonymous') + ']';
  try {
    return JSON.stringify(v);
  } catch (e) {
    return String(v);
  }
}

ONMESSAGE(function (data) {
  const line = function () {
    if (logged >= LOG_CAP) return;
    logged++;
    POST({ t: 'log', v: Array.prototype.slice.call(arguments).map(fmt).join(' ') });
  };

  console.log = line;
  console.info = line;
  console.warn = line;
  console.error = line;

  try {
    (0, eval)(data.src);
    POST({ t: 'done', error: null });
  } catch (e) {
    POST({ t: 'done', error: (e && e.name ? e.name + ': ' : '') + (e && e.message ? e.message : String(e)) });
  }
});
`;

/** Bridges the sandbox to the browser's Web Worker API. */
export const WEB_PRELUDE = `
const POST = function (m) { self.postMessage(m); };
const ONMESSAGE = function (f) { self.onmessage = function (e) { f(e.data); }; };
`;

/** Bridges the sandbox to Node's worker_threads API. */
export const NODE_PRELUDE = `
const { parentPort } = require('worker_threads');
const POST = function (m) { parentPort.postMessage(m); };
const ONMESSAGE = function (f) { parentPort.on('message', f); };
`;
