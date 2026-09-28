import { describe, expect, it } from 'vitest';
import { gradeOne, gradeQuiz, PASS_MARK } from '../quiz';
import type { Question } from '../../content/types';

describe('gradeOne', () => {
  it('grades single choice', () => {
    const q: Question = { k: 'single', q: '?', opts: ['a', 'b'], answer: 1, why: 'w' };
    expect(gradeOne(q, 1)).toBe(true);
    expect(gradeOne(q, 0)).toBe(false);
  });

  it('grades multi choice ignoring order', () => {
    const q: Question = { k: 'multi', q: '?', opts: ['a', 'b', 'c'], answers: [0, 2], why: 'w' };
    expect(gradeOne(q, [2, 0])).toBe(true);
    expect(gradeOne(q, [0])).toBe(false);
    expect(gradeOne(q, [0, 1, 2])).toBe(false);
  });

  it('ignores a duplicated pick in a multi answer', () => {
    const q: Question = { k: 'multi', q: '?', opts: ['a', 'b', 'c'], answers: [0, 2], why: 'w' };
    expect(gradeOne(q, [0, 2, 2])).toBe(true);
  });

  it('grades numeric within tolerance', () => {
    const q: Question = { k: 'numeric', q: '?', answer: 9.81, tol: 0.05, why: 'w' };
    expect(gradeOne(q, 9.8)).toBe(true);
    expect(gradeOne(q, 9.9)).toBe(false);
  });

  it('grades a numeric answer exactly on the tolerance edge as correct', () => {
    const q: Question = { k: 'numeric', q: '?', answer: 10, tol: 0.5, why: 'w' };
    expect(gradeOne(q, 10.5)).toBe(true);
  });

  it('grades code-output questions like single choice', () => {
    const q: Question = { k: 'output', q: '?', code: 'print(1)', lang: 'py', opts: ['1', '2'], answer: 0, why: 'w' };
    expect(gradeOne(q, 0)).toBe(true);
    expect(gradeOne(q, 1)).toBe(false);
  });

  it('grades ordering', () => {
    const q: Question = { k: 'order', q: '?', items: ['x', 'y', 'z'], correct: [2, 0, 1], why: 'w' };
    expect(gradeOne(q, [2, 0, 1])).toBe(true);
    expect(gradeOne(q, [0, 1, 2])).toBe(false);
  });

  it('treats an unanswered question as wrong, never as a crash', () => {
    const q: Question = { k: 'single', q: '?', opts: ['a'], answer: 0, why: 'w' };
    expect(gradeOne(q, null)).toBe(false);
  });

  it('treats a wrong-shaped answer as wrong, never as a crash', () => {
    const multi: Question = { k: 'multi', q: '?', opts: ['a'], answers: [0], why: 'w' };
    expect(gradeOne(multi, 0)).toBe(false);
    const single: Question = { k: 'single', q: '?', opts: ['a'], answer: 0, why: 'w' };
    expect(gradeOne(single, [0])).toBe(false);
  });

  it('treats NaN as a wrong numeric answer', () => {
    const q: Question = { k: 'numeric', q: '?', answer: 1, tol: 0.1, why: 'w' };
    expect(gradeOne(q, Number.NaN)).toBe(false);
  });
});

describe('gradeQuiz', () => {
  const qs: Question[] = [
    { k: 'single', q: '1', opts: ['a', 'b'], answer: 0, why: 'w1' },
    { k: 'single', q: '2', opts: ['a', 'b'], answer: 1, why: 'w2' },
    { k: 'single', q: '3', opts: ['a', 'b'], answer: 1, why: 'w3' },
  ];

  it('reports accuracy and which questions were wrong', () => {
    const r = gradeQuiz(qs, [0, 0, 1]);
    expect(r.correct).toBe(2);
    expect(r.total).toBe(3);
    expect(r.accuracy).toBeCloseTo(2 / 3);
    expect(r.wrongIndexes).toEqual([1]);
  });

  it('counts a missing answer as wrong rather than skipping the question', () => {
    const r = gradeQuiz(qs, [0]);
    expect(r.correct).toBe(1);
    expect(r.total).toBe(3);
    expect(r.wrongIndexes).toEqual([1, 2]);
  });

  it('reports zero accuracy for an empty quiz without dividing by zero', () => {
    const r = gradeQuiz([], []);
    expect(r.accuracy).toBe(0);
    expect(Number.isNaN(r.accuracy)).toBe(false);
  });

  it('reports passed against the pass mark', () => {
    expect(gradeQuiz(qs, [0, 1, 1]).passed).toBe(true);
    expect(gradeQuiz(qs, [1, 0, 0]).passed).toBe(false);
    expect(PASS_MARK).toBe(0.6);
  });
});
