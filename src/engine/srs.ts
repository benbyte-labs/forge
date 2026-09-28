import type { Domain } from '../content/types';
import { addDays } from './dates';
import type { SrsItem } from './types';

/** Days until the next review, by stage. Clearing the last one graduates. */
export const INTERVALS = [1, 3, 7, 16];

/**
 * At most this many reviews are served in a day.
 *
 * Someone returning after three months away has a backlog of everything they
 * ever got wrong. Dumping all of it into one session is how a person quits, so
 * the queue drains a few at a time, oldest first.
 */
export const MAX_DUE_PER_DAY = 5;

export type SrsSeed = Pick<SrsItem, 'id' | 'domain' | 'day' | 'qIndex'>;

export function srsId(domain: Domain, day: number, qIndex: number): string {
  return `${domain}-${day}-${qIndex}`;
}

/** Queue a question the learner just got wrong, or send it back to stage 0. */
export function scheduleWrong(queue: SrsItem[], seed: SrsSeed, today: string): SrsItem[] {
  const fresh: SrsItem = { ...seed, stage: 0, due: addDays(today, INTERVALS[0]) };
  const existing = queue.findIndex((i) => i.id === seed.id);
  if (existing === -1) return [...queue, fresh];
  const next = [...queue];
  next[existing] = fresh;
  return next;
}

/** Record the outcome of a review. A cleared final stage leaves the queue. */
export function answerReview(queue: SrsItem[], id: string, correct: boolean, today: string): SrsItem[] {
  const index = queue.findIndex((i) => i.id === id);
  if (index === -1) return queue;

  const item = queue[index];
  if (!correct) {
    const next = [...queue];
    next[index] = { ...item, stage: 0, due: addDays(today, INTERVALS[0]) };
    return next;
  }

  const stage = item.stage + 1;
  if (stage >= INTERVALS.length) return queue.filter((_, i) => i !== index);

  const next = [...queue];
  next[index] = { ...item, stage, due: addDays(today, INTERVALS[stage]) };
  return next;
}

/** The reviews to serve today: oldest first, capped. */
export function dueToday(queue: SrsItem[], today: string): SrsItem[] {
  return queue
    .filter((i) => i.due <= today)
    .sort((a, b) => (a.due < b.due ? -1 : a.due > b.due ? 1 : 0))
    .slice(0, MAX_DUE_PER_DAY);
}

/** How many reviews are waiting in total, cap included or not. */
export function dueCount(queue: SrsItem[], today: string): number {
  return queue.filter((i) => i.due <= today).length;
}
