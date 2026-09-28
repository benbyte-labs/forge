/**
 * Calendar-date helpers.
 *
 * Every date in FORGE is a local calendar day written as `YYYY-MM-DD`, never a
 * timestamp. Streaks are about days a person lived through, so arithmetic is
 * done on the date parts through `Date.UTC`: doing it on local timestamps
 * drifts by an hour across a DST boundary and floors a two-day gap to one.
 */

/** Format a Date as the local calendar day it falls on. */
export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Today, as a local calendar day. The only place the engine reads the clock. */
export function today(): string {
  return toISODate(new Date());
}

function toUtcMs(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, (m ?? 1) - 1, d ?? 1);
}

const DAY_MS = 86_400_000;

/** Whole calendar days from `a` to `b`. Negative when `b` is earlier. */
export function daysBetween(a: string, b: string): number {
  return Math.round((toUtcMs(b) - toUtcMs(a)) / DAY_MS);
}

/** The calendar day `n` days after `iso`. Accepts a negative `n`. */
export function addDays(iso: string, n: number): string {
  const d = new Date(toUtcMs(iso) + n * DAY_MS);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** True when `iso` looks like a calendar day this app could have written. */
export function isISODate(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
}
