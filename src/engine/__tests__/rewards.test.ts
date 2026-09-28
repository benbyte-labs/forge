import { describe, expect, it } from 'vitest';
import { checkBadges, hasReward, REWARDS, unlockFor } from '../rewards';
import { defaultState } from '../storage';

describe('reward catalogue', () => {
  it('matches the spec milestones', () => {
    expect(REWARDS.map((r) => r.at)).toEqual([3, 7, 10, 14, 21, 30]);
    expect(REWARDS.find((r) => r.at === 3)?.id).toBe('theme-amber');
    expect(REWARDS.find((r) => r.at === 7)?.id).toBe('skin-mk2');
    expect(REWARDS.find((r) => r.at === 14)?.id).toBe('arena-warehouse');
    expect(REWARDS.find((r) => r.at === 21)?.id).toBe('ui-hologram');
    expect(REWARDS.find((r) => r.at === 30)?.id).toBe('badge-30');
  });

  it('gives every reward a name and a description key', () => {
    for (const r of REWARDS) {
      expect(r.nameKey).toBe(`reward.${r.id}.name`);
      expect(r.descKey).toBe(`reward.${r.id}.desc`);
    }
  });

  it('has unique ids', () => {
    expect(new Set(REWARDS.map((r) => r.id)).size).toBe(REWARDS.length);
  });
});

describe('unlockFor', () => {
  it('unlocks the day-3 theme on day 3', () => {
    expect(unlockFor(3, []).map((r) => r.id)).toEqual(['theme-amber']);
  });

  it('never unlocks the same reward twice', () => {
    expect(unlockFor(3, ['theme-amber'])).toEqual([]);
  });

  it('back-fills rewards missed while the app was closed', () => {
    const ids = unlockFor(14, ['theme-amber']).map((r) => r.id);
    expect(ids).toContain('skin-mk2');
    expect(ids).toContain('arena-warehouse');
    expect(ids).not.toContain('theme-amber');
  });

  it('unlocks nothing on a non-milestone day once the earlier rewards are held', () => {
    expect(unlockFor(5, ['theme-amber'])).toEqual([]);
  });

  it('still hands over an earlier reward that was never collected', () => {
    expect(unlockFor(5, []).map((r) => r.id)).toEqual(['theme-amber']);
  });

  it('unlocks nothing at day zero', () => {
    expect(unlockFor(0, [])).toEqual([]);
  });
});

describe('hasReward', () => {
  it('reads the unlocked list', () => {
    expect(hasReward(defaultState(), 'theme-amber')).toBe(false);
    expect(hasReward({ ...defaultState(), rewards: ['theme-amber'] }, 'theme-amber')).toBe(true);
  });
});

describe('checkBadges', () => {
  it('awards the perfect-quiz badge on a flawless quiz', () => {
    const s = { ...defaultState(), days: { 'code-1': { lessonDone: true, labDone: false, quizAccuracy: 1, completedOn: null } } };
    expect(checkBadges(s).map((b) => b.id)).toContain('badge-perfect');
  });

  it('does not re-award a badge already held', () => {
    const s = {
      ...defaultState(),
      rewards: ['badge-perfect'],
      days: { 'code-1': { lessonDone: true, labDone: false, quizAccuracy: 1, completedOn: null } },
    };
    expect(checkBadges(s).map((b) => b.id)).not.toContain('badge-perfect');
  });

  it('awards the note-collector badge at ten notes', () => {
    const note = { id: 'x', domain: 'code' as const, day: 1, title: 't', locale: 'hu' as const, summary: [], terms: [], watchOut: [], userNote: '', createdAt: '2026-09-28' };
    const nine = { ...defaultState(), notes: Array.from({ length: 9 }, (_, i) => ({ ...note, id: `n${i}` })) };
    const ten = { ...defaultState(), notes: Array.from({ length: 10 }, (_, i) => ({ ...note, id: `n${i}` })) };
    expect(checkBadges(nine).map((b) => b.id)).not.toContain('badge-notes-10');
    expect(checkBadges(ten).map((b) => b.id)).toContain('badge-notes-10');
  });
});
