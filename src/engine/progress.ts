import type { Domain } from '../content/types';
import { emptyDayProgress, type AppState, type DayProgress } from './types';

/** What each activity is worth. Tuned so one full day lands around 50–95 XP. */
export const XP = {
  lesson: 20,
  quizMin: 10,
  quizMax: 30,
  lab: 40,
  dailyGoal: 25,
} as const;

/** A quiz counts as passed from here up. */
export const PASS_MARK = 0.6;

/** XP needed to reach `level`. Level 1 is free. */
export function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.round(100 * Math.pow(level, 1.35));
}

export function levelFromXp(xp: number): number {
  const safe = Number.isFinite(xp) && xp > 0 ? xp : 0;
  let level = 1;
  while (level < 999 && safe >= xpForLevel(level + 1)) level++;
  return level;
}

/** XP remaining until the next level, and how far through the current one. */
export function levelProgress(xp: number): { level: number; into: number; span: number } {
  const level = levelFromXp(xp);
  const floor = xpForLevel(level);
  const ceil = xpForLevel(level + 1);
  return { level, into: Math.max(0, xp - floor), span: Math.max(1, ceil - floor) };
}

export function quizXp(accuracy: number): number {
  if (!Number.isFinite(accuracy) || accuracy < PASS_MARK) return 0;
  const t = Math.min(1, (accuracy - PASS_MARK) / (1 - PASS_MARK));
  return Math.round(XP.quizMin + t * (XP.quizMax - XP.quizMin));
}

export function dayKey(domain: Domain, day: number): string {
  return `${domain}-${day}`;
}

/** A day counts as done when the lesson was read and the quiz was passed. */
export function isDayComplete(p: DayProgress | undefined): boolean {
  return !!p && p.lessonDone && p.quizAccuracy !== null && p.quizAccuracy >= PASS_MARK;
}

function withDay(state: AppState, key: string, patch: Partial<DayProgress>, xpDelta: number): AppState {
  const before = state.days[key] ?? emptyDayProgress();
  return {
    ...state,
    xp: state.xp + xpDelta,
    days: { ...state.days, [key]: { ...before, ...patch } },
  };
}

export function awardLesson(state: AppState, domain: Domain, day: number): AppState {
  const key = dayKey(domain, day);
  if (state.days[key]?.lessonDone) return state;
  return withDay(state, key, { lessonDone: true }, XP.lesson);
}

/**
 * Record a quiz attempt. Only the best accuracy is kept, and only the
 * difference in XP is paid out — so retrying to improve is rewarded, but
 * grinding the same score is not.
 */
export function awardQuiz(state: AppState, domain: Domain, day: number, accuracy: number): AppState {
  const key = dayKey(domain, day);
  const before = state.days[key]?.quizAccuracy;
  const best = before === null || before === undefined ? accuracy : Math.max(before, accuracy);
  const paid = before === null || before === undefined ? 0 : quizXp(before);
  return withDay(state, key, { quizAccuracy: best }, Math.max(0, quizXp(best) - paid));
}

export function awardLab(state: AppState, domain: Domain, day: number): AppState {
  const key = dayKey(domain, day);
  if (state.days[key]?.labDone) return state;
  return withDay(state, key, { labDone: true }, XP.lab);
}

/** Stamp the calendar day a day-of-content was finished on, once. */
export function markCompletedOn(state: AppState, domain: Domain, day: number, date: string): AppState {
  const key = dayKey(domain, day);
  const p = state.days[key];
  if (!p || !isDayComplete(p) || p.completedOn) return state;
  return {
    ...state,
    xp: state.xp + XP.dailyGoal,
    days: { ...state.days, [key]: { ...p, completedOn: date } },
  };
}

export function countCompletedDays(state: AppState): number {
  return Object.values(state.days).filter(isDayComplete).length;
}

export function countCompletedInTrack(state: AppState, domain: Domain): number {
  return Object.entries(state.days).filter(([k, p]) => k.startsWith(`${domain}-`) && isDayComplete(p)).length;
}
