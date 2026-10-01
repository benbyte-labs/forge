import type { Domain } from '../content/types';

/**
 * Supported interface languages.
 *
 * `hu` and `en` are the primary pair: both carry the full interface and all
 * authored content. Further languages translate the interface and fall back to
 * English for any track day not yet translated, so a new language can be added
 * without first translating two hundred lessons.
 */
export type Locale = 'hu' | 'en' | 'de' | 'es';

/** Languages that must be complete: every UI string, every authored day. */
export const PRIMARY_LOCALES = ['hu', 'en'] as const;
export type ThemeId = 'cyan' | 'amber' | 'void' | 'light';

/** What the learner has done on one day of one track. */
export interface DayProgress {
  lessonDone: boolean;
  labDone: boolean;
  /** Best accuracy across every attempt, 0..1. `null` means never attempted. */
  quizAccuracy: number | null;
  completedOn: string | null;
}

export interface StreakState {
  current: number;
  best: number;
  lastCompletedDate: string | null;
  freezes: number;
  freezeUsedOn: string | null;
}

export interface SrsItem {
  id: string;
  domain: Domain;
  day: number;
  qIndex: number;
  /** Index into `INTERVALS`. */
  stage: number;
  due: string;
}

export interface StoredNote {
  id: string;
  domain: Domain;
  day: number;
  title: string;
  locale: Locale;
  summary: string[];
  terms: { term: string; def: string }[];
  formulas?: { tex: string; meaning: string }[];
  /** Explanations of the questions this learner got wrong. Empty when perfect. */
  watchOut: string[];
  userNote: string;
  createdAt: string;
}

export interface AppState {
  version: number;
  locale: Locale;
  theme: ThemeId;
  motion: boolean;
  activeTrack: Domain | null;
  /** Keyed by `dayKey(domain, day)`. */
  days: Record<string, DayProgress>;
  xp: number;
  streak: StreakState;
  /** Unlocked reward ids. */
  rewards: string[];
  srs: SrsItem[];
  notes: StoredNote[];
  /** Keyed by `dayKey(domain, day)`, or a lab id for free-play drafts. */
  codeDrafts: Record<string, string>;
  /** Robot Lab cosmetic selection, gated by `rewards`. */
  robotSkin: string;
}

export function emptyDayProgress(): DayProgress {
  return { lessonDone: false, labDone: false, quizAccuracy: null, completedOn: null };
}
