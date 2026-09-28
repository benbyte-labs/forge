import { describe, expect, it } from 'vitest';
import { answerReview, dueToday, INTERVALS, MAX_DUE_PER_DAY, scheduleWrong } from '../srs';
import type { SrsItem } from '../types';

const seed = { id: 'code-1-0', domain: 'code' as const, day: 1, qIndex: 0 };

function sortedByDue(items: SrsItem[]) {
  return items.every((it, i) => i === 0 || items[i - 1].due <= it.due);
}

describe('scheduleWrong', () => {
  it('schedules a wrong answer for tomorrow', () => {
    const q = scheduleWrong([], seed, '2026-09-28');
    expect(q[0].due).toBe('2026-09-29');
    expect(q[0].stage).toBe(0);
  });

  it('does not duplicate an item already queued', () => {
    let q = scheduleWrong([], seed, '2026-09-28');
    q = scheduleWrong(q, seed, '2026-09-28');
    expect(q).toHaveLength(1);
  });

  it('resets an already-advanced item back to the first interval', () => {
    let q = scheduleWrong([], seed, '2026-09-28');
    q = answerReview(q, seed.id, true, '2026-09-29');
    q = scheduleWrong(q, seed, '2026-10-02');
    expect(q[0].stage).toBe(0);
    expect(q[0].due).toBe('2026-10-03');
  });
});

describe('answerReview', () => {
  it('advances the interval on a correct review', () => {
    let q = scheduleWrong([], seed, '2026-09-28');
    q = answerReview(q, seed.id, true, '2026-09-29');
    expect(q[0].stage).toBe(1);
    expect(q[0].due).toBe('2026-10-02');
  });

  it('graduates an item out of the queue after the last interval', () => {
    let q = scheduleWrong([], seed, '2026-09-28');
    for (const date of ['2026-09-29', '2026-10-02', '2026-10-09', '2026-10-25']) {
      q = answerReview(q, seed.id, true, date);
    }
    expect(q).toHaveLength(0);
  });

  it('resets to the first interval on a wrong review', () => {
    let q = scheduleWrong([], seed, '2026-09-28');
    q = answerReview(q, seed.id, true, '2026-09-29');
    q = answerReview(q, seed.id, false, '2026-10-02');
    expect(q[0].stage).toBe(0);
    expect(q[0].due).toBe('2026-10-03');
  });

  it('ignores an id that is not in the queue', () => {
    const q = scheduleWrong([], seed, '2026-09-28');
    expect(answerReview(q, 'nope', true, '2026-09-29')).toEqual(q);
  });

  it('has four intervals rising to a fortnight', () => {
    expect(INTERVALS).toEqual([1, 3, 7, 16]);
  });
});

describe('dueToday', () => {
  it('returns nothing before the due date', () => {
    const q = scheduleWrong([], seed, '2026-09-28');
    expect(dueToday(q, '2026-09-28')).toHaveLength(0);
  });

  it('returns an item on its due date', () => {
    const q = scheduleWrong([], seed, '2026-09-28');
    expect(dueToday(q, '2026-09-29')).toHaveLength(1);
  });

  it('caps the daily review load and serves the most overdue first', () => {
    let q: SrsItem[] = [];
    for (let i = 0; i < 40; i++) {
      const date = `2026-06-${String((i % 28) + 1).padStart(2, '0')}`;
      q = scheduleWrong(q, { ...seed, id: `code-1-${i}`, qIndex: i }, date);
    }
    const due = dueToday(q, '2026-09-28');
    expect(due).toHaveLength(MAX_DUE_PER_DAY);
    expect(sortedByDue(due)).toBe(true);
    expect(due[0].due).toBe('2026-06-02');
  });
});
