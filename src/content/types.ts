/**
 * The shape of every piece of course content.
 *
 * These are pure type declarations with no runtime dependency, which is why
 * they live here rather than inside the engine: the engine grades quizzes and
 * builds notes out of them, and the content modules produce them.
 */

/**
 * Every learning track in the app.
 *
 * Adding one is a matter of listing it here and dropping a content module in
 * `content/<locale>/tracks/` — the validation test then insists on day 1 in the
 * primary languages, so a half-added track cannot reach a learner.
 */
export type Domain =
  | 'code'
  | 'java'
  | 'c'
  | 'cpp'
  | 'robotics'
  | 'physics'
  | 'cad'
  | 'blender';

export const ALL_DOMAINS: Domain[] = ['code', 'java', 'c', 'cpp', 'robotics', 'physics', 'cad', 'blender'];

/** How the tracks are grouped on the home screen. */
export const TRACK_GROUPS: { key: string; tracks: Domain[] }[] = [
  { key: 'group.coding', tracks: ['code', 'java', 'c', 'cpp'] },
  { key: 'group.making', tracks: ['robotics', 'cad', 'blender'] },
  { key: 'group.science', tracks: ['physics'] },
];

export type SimId = 'projectile' | 'spring' | 'incline' | 'torque' | 'circuit' | 'motor';
export type SceneId = 'flat' | 'obstacle' | 'line' | 'warehouse' | 'arm-bench';
/**
 * Languages a code sample can be written in.
 *
 * Only `py` and `js` run in the Code Lab; the others appear in lessons and in
 * read-and-predict quiz questions, because compiling Java or C in the browser
 * would cost more than it teaches.
 */
export type CodeLang = 'py' | 'js' | 'java' | 'c' | 'cpp';

/** The languages the Code Lab can actually execute. */
export const RUNNABLE_LANGS: CodeLang[] = ['py', 'js'];

// ── Lesson blocks ────────────────────────────────────────────────────

export type Block =
  | { k: 'text'; md: string }
  | { k: 'code'; lang: CodeLang; src: string; explain?: string }
  | { k: 'formula'; tex: string; explain: string }
  | { k: 'callout'; tone: 'tip' | 'warn' | 'key'; md: string }
  | { k: 'sim'; sim: SimId; params?: Record<string, number> }
  | { k: 'robot'; scene: SceneId }
  | { k: 'model'; src: string };

// ── Quiz questions ───────────────────────────────────────────────────

export interface QSingle { k: 'single'; q: string; opts: string[]; answer: number; why: string }
export interface QMulti { k: 'multi'; q: string; opts: string[]; answers: number[]; why: string }
export interface QNumeric { k: 'numeric'; q: string; answer: number; tol: number; unit?: string; why: string }
export interface QOutput { k: 'output'; q: string; code: string; lang: CodeLang; opts: string[]; answer: number; why: string }
export interface QOrder { k: 'order'; q: string; items: string[]; correct: number[]; why: string }

export type Question = QSingle | QMulti | QNumeric | QOutput | QOrder;

// ── Lab tasks ────────────────────────────────────────────────────────

/** An automatic check run against the learner's solution. */
export type Check =
  | { k: 'output'; contains: string; label: string }
  | { k: 'outputEquals'; value: string; label: string }
  | { k: 'calls'; fn: string; args: unknown[]; equals: unknown; label: string }
  | { k: 'mission'; mission: string; label: string };

export interface LabTask {
  lab: 'code' | 'robot' | 'physics' | 'cad';
  lang?: CodeLang;
  brief: string;
  starter?: string;
  scene?: SceneId;
  checks: Check[];
  hints: string[];
}

// ── Notes ────────────────────────────────────────────────────────────

export interface NoteSource {
  summary: string[];
  terms: { term: string; def: string }[];
  formulas?: { tex: string; meaning: string }[];
}

// ── Days and tracks ──────────────────────────────────────────────────

export interface Day {
  day: number;
  title: string;
  minutes: number;
  lesson: Block[];
  lab?: LabTask;
  quiz: Question[];
  note: NoteSource;
}

export interface Track {
  id: Domain;
  title: string;
  blurb: string;
  /** The full 30-day arc. Days beyond `days.length` render as "coming soon". */
  plannedTitles: string[];
  days: Day[];
}

export const TRACK_LENGTH = 30;
