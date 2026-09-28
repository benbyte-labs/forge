import { countCompletedDays } from './progress';
import type { AppState } from './types';

export type RewardKind = 'theme' | 'skin' | 'arena' | 'uimode' | 'badge' | 'freeze' | 'track';

export interface Reward {
  id: string;
  kind: RewardKind;
  /** Streak day this unlocks at. `0` means it is not streak-based. */
  at: number;
  nameKey: string;
  descKey: string;
  /** For themes and skins: the value this reward makes selectable. */
  grants?: string;
}

function reward(id: string, kind: RewardKind, at: number, grants?: string): Reward {
  return { id, kind, at, nameKey: `reward.${id}.name`, descKey: `reward.${id}.desc`, grants };
}

/**
 * The streak reward catalogue.
 *
 * Every entry unlocks something the learner can actually use — a theme, a robot
 * skin, a new arena with its own missions, an interface mode. A reward that is
 * only an icon does not motivate anyone twice.
 */
export const REWARDS: Reward[] = [
  reward('theme-amber', 'theme', 3, 'amber'),
  reward('skin-mk2', 'skin', 7, 'mk2'),
  reward('freeze-1', 'freeze', 10),
  reward('arena-warehouse', 'arena', 14, 'warehouse'),
  reward('ui-hologram', 'uimode', 21, 'hologram'),
  reward('badge-30', 'badge', 30, 'void'),
];

/**
 * Every catalogue entry earned by a streak of `streakDay` that is not held yet.
 *
 * It looks at everything at or below the day rather than only the exact
 * milestone, so a reward is never lost to an app that was closed on the day it
 * would have fired, or to a streak restored by a freeze.
 */
export function unlockFor(streakDay: number, owned: string[]): Reward[] {
  if (streakDay <= 0) return [];
  return REWARDS.filter((r) => r.at <= streakDay && !owned.includes(r.id));
}

export function hasReward(state: AppState, id: string): boolean {
  return state.rewards.includes(id);
}

// ── Achievement badges ───────────────────────────────────────────────

interface Badge extends Reward {
  earned(state: AppState): boolean;
}

function badge(id: string, earned: (s: AppState) => boolean): Badge {
  return { ...reward(id, 'badge', 0), earned };
}

export const BADGES: Badge[] = [
  badge('badge-perfect', (s) => Object.values(s.days).some((d) => d.quizAccuracy === 1)),
  badge('badge-notes-10', (s) => s.notes.length >= 10),
  badge('badge-week', (s) => countCompletedDays(s) >= 7),
  badge('badge-annotator', (s) => s.notes.filter((n) => n.userNote.trim() !== '').length >= 5),
];

/** Badges the current state has earned but does not hold yet. */
export function checkBadges(state: AppState): Reward[] {
  return BADGES.filter((b) => !state.rewards.includes(b.id) && b.earned(state)).map(
    ({ earned: _earned, ...r }) => r,
  );
}

/** Theme ids selectable given what has been unlocked. */
export function availableThemes(state: AppState): string[] {
  const base = ['cyan', 'light'];
  for (const r of REWARDS) {
    if (r.kind === 'theme' && r.grants && hasReward(state, r.id)) base.push(r.grants);
    if (r.id === 'badge-30' && r.grants && hasReward(state, r.id)) base.push(r.grants);
  }
  return base;
}
