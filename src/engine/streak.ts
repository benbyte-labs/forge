import { addDays, daysBetween } from './dates';
import type { StreakState } from './types';

/** Streak lengths that hand out a reward. */
export const MILESTONES = [3, 7, 10, 14, 21, 30] as const;

/** A freeze is granted on every tenth day of a streak… */
export const FREEZE_EVERY = 10;
/** …and no more than this many are ever held in reserve. */
export const MAX_FREEZES = 2;

export function emptyStreak(): StreakState {
  return { current: 0, best: 0, lastCompletedDate: null, freezes: 0, freezeUsedOn: null };
}

/**
 * Record that today's goal was met.
 *
 * Calling this twice on the same day is a no-op, so a learner who finishes two
 * days of content in one sitting still gains one day of streak — the streak
 * measures showing up, not volume.
 */
export function recordDayComplete(
  streak: StreakState,
  today: string,
): { streak: StreakState; milestone: number | null } {
  const last = streak.lastCompletedDate;
  if (last === today) return { streak, milestone: null };

  const gap = last === null ? Infinity : daysBetween(last, today);
  const current = gap === 1 ? streak.current + 1 : 1;

  const earnsFreeze = current % FREEZE_EVERY === 0;
  const freezes = earnsFreeze ? Math.min(MAX_FREEZES, streak.freezes + 1) : streak.freezes;

  const milestone = (MILESTONES as readonly number[]).includes(current) ? current : null;

  return {
    streak: {
      current,
      best: Math.max(streak.best, current),
      lastCompletedDate: today,
      freezes,
      freezeUsedOn: streak.freezeUsedOn,
    },
    milestone,
  };
}

/**
 * Bring a streak up to date with the calendar. Call once when the app opens.
 *
 * A single missed day is covered by a freeze if one is held. Two or more
 * missed days break the streak — but only the counter: the personal best, the
 * held freezes, and everything outside this object (XP, badges, notes) are
 * untouched, because punishing an absence by deleting work already done would
 * make the app hostile to the person it is meant to help.
 *
 * A `lastCompletedDate` in the future means the clock moved backwards, not that
 * the learner time-travelled, so it is treated as "up to date" rather than as
 * a gap.
 */
export function reconcile(
  streak: StreakState,
  today: string,
): { streak: StreakState; brokenAfter: number; freezeSpent: boolean } {
  const last = streak.lastCompletedDate;
  if (last === null || streak.current === 0) {
    return { streak, brokenAfter: 0, freezeSpent: false };
  }

  const gap = daysBetween(last, today);
  if (gap <= 1) return { streak, brokenAfter: 0, freezeSpent: false };

  if (gap === 2 && streak.freezes > 0) {
    return {
      streak: {
        ...streak,
        freezes: streak.freezes - 1,
        // Pretend yesterday was completed, so the streak can continue today.
        lastCompletedDate: addDays(today, -1),
        freezeUsedOn: today,
      },
      brokenAfter: 0,
      freezeSpent: true,
    };
  }

  return {
    streak: { ...streak, current: 0, freezeUsedOn: null },
    brokenAfter: streak.current,
    freezeSpent: false,
  };
}
