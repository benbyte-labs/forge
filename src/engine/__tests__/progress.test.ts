import { describe, expect, it } from 'vitest';
import { defaultState } from '../storage';
import { awardLab, awardLesson, awardQuiz, dayKey, isDayComplete, levelFromXp, quizXp, xpForLevel } from '../progress';

describe('levels', () => {
  it('starts at level 1 with no xp', () => {
    expect(levelFromXp(0)).toBe(1);
  });

  it('levels up exactly at the threshold', () => {
    const t = xpForLevel(2);
    expect(levelFromXp(t - 1)).toBe(1);
    expect(levelFromXp(t)).toBe(2);
  });

  it('is monotonic across a wide xp range', () => {
    let prev = 1;
    for (let xp = 0; xp < 20000; xp += 137) {
      const lvl = levelFromXp(xp);
      expect(lvl).toBeGreaterThanOrEqual(prev);
      prev = lvl;
    }
  });

  it('treats a nonsense xp value as zero rather than NaN', () => {
    expect(levelFromXp(Number.NaN)).toBe(1);
    expect(levelFromXp(-50)).toBe(1);
  });
});

describe('quizXp', () => {
  it('gives the floor for a bare pass', () => {
    expect(quizXp(0.6)).toBe(10);
  });
  it('gives the maximum for a perfect score', () => {
    expect(quizXp(1)).toBe(30);
  });
  it('gives nothing below the pass mark', () => {
    expect(quizXp(0.4)).toBe(0);
  });
});

describe('dayKey', () => {
  it('is stable and readable', () => {
    expect(dayKey('code', 7)).toBe('code-7');
  });
});

describe('awards', () => {
  it('adds lesson xp once, not twice', () => {
    let s = defaultState();
    s = awardLesson(s, 'code', 1);
    const afterFirst = s.xp;
    s = awardLesson(s, 'code', 1);
    expect(s.xp).toBe(afterFirst);
  });

  it('marks a day complete only after the lesson and a passing quiz', () => {
    let s = defaultState();
    s = awardLesson(s, 'code', 1);
    expect(isDayComplete(s.days['code-1'])).toBe(false);
    s = awardQuiz(s, 'code', 1, 0.5);
    expect(isDayComplete(s.days['code-1'])).toBe(false);
    s = awardQuiz(s, 'code', 1, 0.8);
    expect(isDayComplete(s.days['code-1'])).toBe(true);
  });

  it('keeps the best quiz accuracy on a retry', () => {
    let s = defaultState();
    s = awardQuiz(s, 'code', 1, 0.9);
    s = awardQuiz(s, 'code', 1, 0.6);
    expect(s.days['code-1'].quizAccuracy).toBeCloseTo(0.9);
  });

  it('awards the extra xp when a retry beats the previous best', () => {
    let s = defaultState();
    s = awardQuiz(s, 'code', 1, 0.6);
    const afterFirst = s.xp;
    s = awardQuiz(s, 'code', 1, 1);
    expect(s.xp).toBe(afterFirst + (quizXp(1) - quizXp(0.6)));
  });

  it('awards lab xp once', () => {
    let s = defaultState();
    s = awardLab(s, 'code', 1);
    const afterFirst = s.xp;
    s = awardLab(s, 'code', 1);
    expect(s.xp).toBe(afterFirst);
  });

  it('treats an undefined day as incomplete', () => {
    expect(isDayComplete(undefined)).toBe(false);
  });

  it('does not mutate the input state', () => {
    const s = defaultState();
    const frozen = JSON.stringify(s);
    awardLesson(s, 'code', 1);
    expect(JSON.stringify(s)).toBe(frozen);
  });
});
