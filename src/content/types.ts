/**
 * The shape of every piece of course content.
 *
 * These are pure type declarations with no runtime dependency, which is why
 * they live here rather than inside the engine: the engine grades quizzes and
 * builds notes out of them, and the content modules produce them.
 */

export type Domain = 'code' | 'robotics' | 'physics' | 'cad';
export const ALL_DOMAINS: Domain[] = ['code', 'robotics', 'physics', 'cad'];

export type SimId = 'projectile' | 'spring' | 'incline' | 'torque' | 'circuit' | 'motor';
export type SceneId = 'flat' | 'obstacle' | 'line' | 'warehouse' | 'arm-bench';
export type CodeLang = 'py' | 'js';

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
