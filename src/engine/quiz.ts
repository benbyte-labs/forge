import type { Question } from '../content/types';
import { PASS_MARK } from './progress';

export { PASS_MARK };

/** What the learner picked. `null` means they never answered. */
export type Answer = number | number[] | null;

function asIndexSet(a: Answer): Set<number> | null {
  if (!Array.isArray(a)) return null;
  if (!a.every((n) => typeof n === 'number' && Number.isInteger(n))) return null;
  return new Set(a);
}

function sameSet(a: Set<number>, b: number[]): boolean {
  if (a.size !== new Set(b).size) return false;
  return b.every((n) => a.has(n));
}

/**
 * Grade one answer.
 *
 * Anything that is not the shape this question expects — a missing answer, an
 * array where a number belongs, a NaN — is wrong, not an error. The learner
 * gets a wrong mark and an explanation; the app does not fall over.
 */
export function gradeOne(q: Question, a: Answer): boolean {
  switch (q.k) {
    case 'single':
    case 'output':
      return typeof a === 'number' && a === q.answer;

    case 'multi': {
      const picked = asIndexSet(a);
      return picked !== null && sameSet(picked, q.answers);
    }

    case 'numeric':
      return typeof a === 'number' && Number.isFinite(a) && Math.abs(a - q.answer) <= q.tol;

    case 'order':
      return (
        Array.isArray(a) &&
        a.length === q.correct.length &&
        a.every((v, i) => v === q.correct[i])
      );

    default:
      return false;
  }
}

export interface QuizResult {
  correct: number;
  total: number;
  accuracy: number;
  passed: boolean;
  wrongIndexes: number[];
}

export function gradeQuiz(questions: Question[], answers: Answer[]): QuizResult {
  const wrongIndexes: number[] = [];
  let correct = 0;

  questions.forEach((q, i) => {
    if (gradeOne(q, answers[i] ?? null)) correct++;
    else wrongIndexes.push(i);
  });

  const total = questions.length;
  const accuracy = total === 0 ? 0 : correct / total;
  return { correct, total, accuracy, passed: total > 0 && accuracy >= PASS_MARK, wrongIndexes };
}
