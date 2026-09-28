import { describe, expect, it } from 'vitest';
import { addDays, daysBetween, toISODate } from '../dates';

describe('dates', () => {
  it('formats a local date as YYYY-MM-DD', () => {
    expect(toISODate(new Date(2026, 8, 28, 23, 30))).toBe('2026-09-28');
  });

  it('pads single-digit months and days', () => {
    expect(toISODate(new Date(2026, 0, 5))).toBe('2026-01-05');
  });

  it('counts whole calendar days forward', () => {
    expect(daysBetween('2026-09-28', '2026-09-30')).toBe(2);
  });

  it('returns zero for the same day', () => {
    expect(daysBetween('2026-09-28', '2026-09-28')).toBe(0);
  });

  it('returns a negative count when the second date is earlier', () => {
    expect(daysBetween('2026-09-30', '2026-09-28')).toBe(-2);
  });

  it('crosses a DST boundary without drifting', () => {
    expect(daysBetween('2026-10-24', '2026-10-26')).toBe(2);
  });

  it('crosses a leap day', () => {
    expect(daysBetween('2028-02-28', '2028-03-01')).toBe(2);
  });

  it('adds days across a month boundary', () => {
    expect(addDays('2026-09-30', 1)).toBe('2026-10-01');
  });

  it('adds days across a year boundary', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
  });

  it('subtracts with a negative offset', () => {
    expect(addDays('2026-01-01', -1)).toBe('2025-12-31');
  });
});
