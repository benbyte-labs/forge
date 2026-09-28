import type { CodeLang } from '../../../content/types';
import { runJs } from './js';
import { runPython } from './python';
import type { RunOptions, RunResult } from './types';

export type { RunResult, RunOptions } from './types';

/** Run the learner's code in whichever language the task is written in. */
export function runCode(lang: CodeLang, src: string, options: RunOptions = {}): Promise<RunResult> {
  return lang === 'py' ? runPython(src, options) : runJs(src, options);
}
