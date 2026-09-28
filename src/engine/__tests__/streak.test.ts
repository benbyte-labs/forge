import { describe, expect, it } from 'vitest';
import { MILESTONES, recordDayComplete, reconcile } from '../streak';
import type { StreakState } from '../types';

const base: StreakState = { current: 0, best: 0, lastCompletedDate: null, freezes: 0, freezeUsedOn: null };

describe('recordDayComplete', () => {
  it('starts a streak at 1', () => {
    expect(recordDayComplete(base, '2026-09-28').streak.current).toBe(1);
  });

  it('increments on a consecutive day', () => {
    const { streak } = recordDayComplete({ ...base, current: 4, lastCompletedDate: '2026-09-27' }, '2026-09-28');
    expect(streak.current).toBe(5);
  });

  it('is idempotent on the same day', () => {
    const { streak } = recordDayComplete({ ...base, current: 4, lastCompletedDate: '2026-09-28' }, '2026-09-28');
    expect(streak.current).toBe(4);
  });

  it('restarts at 1 after a gap', () => {
    const { streak } = recordDayComplete({ ...base, current: 9, lastCompletedDate: '2026-09-20' }, '2026-09-28');
    expect(streak.current).toBe(1);
  });

  it('tracks the personal best', () => {
    const { streak } = recordDayComplete({ ...base, current: 9, best: 9, lastCompletedDate: '2026-09-27' }, '2026-09-28');
    expect(streak.best).toBe(10);
  });

  it('never lowers the personal best', () => {
    const { streak } = recordDayComplete({ ...base, current: 0, best: 22, lastCompletedDate: null }, '2026-09-28');
    expect(streak.best).toBe(22);
  });

  it('reports a milestone exactly on the milestone day', () => {
    const at7 = recordDayComplete({ ...base, current: 6, lastCompletedDate: '2026-09-27' }, '2026-09-28');
    expect(at7.milestone).toBe(7);
    const at8 = recordDayComplete({ ...base, current: 7, lastCompletedDate: '2026-09-27' }, '2026-09-28');
    expect(at8.milestone).toBe(null);
  });

  it('reports every milestone in the catalogue', () => {
    for (const m of MILESTONES) {
      const r = recordDayComplete({ ...base, current: m - 1, lastCompletedDate: '2026-09-27' }, '2026-09-28');
      expect(r.milestone).toBe(m);
    }
  });

  it('grants a freeze every tenth day, capped at two', () => {
    const at10 = recordDayComplete({ ...base, current: 9, lastCompletedDate: '2026-09-27' }, '2026-09-28');
    expect(at10.streak.freezes).toBe(1);
    const at20 = recordDayComplete({ ...base, current: 19, freezes: 2, lastCompletedDate: '2026-09-27' }, '2026-09-28');
    expect(at20.streak.freezes).toBe(2);
  });

  it('does not grant a freeze on a non-tenth day', () => {
    const { streak } = recordDayComplete({ ...base, current: 10, lastCompletedDate: '2026-09-27' }, '2026-09-28');
    expect(streak.freezes).toBe(0);
  });
});

describe('reconcile', () => {
  it('leaves an untouched streak alone on the same day', () => {
    const r = reconcile({ ...base, current: 5, lastCompletedDate: '2026-09-28' }, '2026-09-28');
    expect(r.streak.current).toBe(5);
    expect(r.brokenAfter).toBe(0);
  });

  it('leaves an active streak alone on the next day', () => {
    expect(reconcile({ ...base, current: 5, lastCompletedDate: '2026-09-27' }, '2026-09-28').streak.current).toBe(5);
  });

  it('does nothing when there is no streak yet', () => {
    const r = reconcile(base, '2026-09-28');
    expect(r.streak).toEqual(base);
    expect(r.brokenAfter).toBe(0);
  });

  it('spends a freeze on exactly one missed day', () => {
    const r = reconcile({ ...base, current: 12, freezes: 1, lastCompletedDate: '2026-09-26' }, '2026-09-28');
    expect(r.streak.current).toBe(12);
    expect(r.streak.freezes).toBe(0);
    expect(r.freezeSpent).toBe(true);
    expect(r.streak.lastCompletedDate).toBe('2026-09-27');
  });

  it('does not spend a second freeze for the same missed day', () => {
    const once = reconcile({ ...base, current: 12, freezes: 2, lastCompletedDate: '2026-09-26' }, '2026-09-28');
    const twice = reconcile(once.streak, '2026-09-28');
    expect(twice.freezeSpent).toBe(false);
    expect(twice.streak.freezes).toBe(1);
  });

  it('breaks the streak on two missed days even with a freeze', () => {
    const r = reconcile({ ...base, current: 12, freezes: 1, lastCompletedDate: '2026-09-25' }, '2026-09-28');
    expect(r.streak.current).toBe(0);
    expect(r.streak.freezes).toBe(1);
    expect(r.brokenAfter).toBe(12);
  });

  it('breaks the streak with no freeze available', () => {
    expect(reconcile({ ...base, current: 3, freezes: 0, lastCompletedDate: '2026-09-26' }, '2026-09-28').streak.current).toBe(0);
  });

  it('keeps the personal best when a streak breaks', () => {
    const r = reconcile({ ...base, current: 12, best: 12, lastCompletedDate: '2026-09-01' }, '2026-09-28');
    expect(r.streak.current).toBe(0);
    expect(r.streak.best).toBe(12);
  });

  it('does not go negative or double-count when lastCompletedDate is in the future', () => {
    const r = reconcile({ ...base, current: 5, freezes: 1, lastCompletedDate: '2026-10-05' }, '2026-09-28');
    expect(r.streak.current).toBe(5);
    expect(r.brokenAfter).toBe(0);
    expect(r.streak.freezes).toBe(1);
    expect(r.freezeSpent).toBe(false);
  });

  it('survives a long absence without losing the record or the freezes', () => {
    const r = reconcile({ ...base, current: 30, best: 30, freezes: 2, lastCompletedDate: '2026-06-01' }, '2026-09-28');
    expect(r.streak.current).toBe(0);
    expect(r.streak.best).toBe(30);
    expect(r.streak.freezes).toBe(2);
    expect(r.brokenAfter).toBe(30);
  });
});
