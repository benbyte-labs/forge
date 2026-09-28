import { describe, expect, it } from 'vitest';
import { defaultState, migrate, SCHEMA_VERSION } from '../storage';

describe('migrate', () => {
  it('returns a default state for null input', () => {
    const { state, recovered } = migrate(null);
    expect(state).toEqual(defaultState());
    expect(recovered).toBe(false);
  });

  it('passes through a current-version state unchanged', () => {
    const current = { ...defaultState(), xp: 420 };
    const { state, recovered } = migrate(current);
    expect(state.xp).toBe(420);
    expect(recovered).toBe(false);
  });

  it('recovers from malformed JSON-shaped garbage', () => {
    const { state, recovered } = migrate({ lol: true });
    expect(state.version).toBe(SCHEMA_VERSION);
    expect(state.xp).toBe(0);
    expect(recovered).toBe(true);
  });

  it('recovers from a string instead of an object', () => {
    const { state, recovered } = migrate('not a state');
    expect(state).toEqual(defaultState());
    expect(recovered).toBe(true);
  });

  it('fills in fields added after the saved version', () => {
    const { state } = migrate({ version: 0, xp: 100, locale: 'hu' });
    expect(state.xp).toBe(100);
    expect(state.notes).toEqual([]);
    expect(state.version).toBe(SCHEMA_VERSION);
  });

  it('never loses xp or notes when recovering a partially valid state', () => {
    const partial = {
      version: 1,
      xp: 55,
      notes: [{ id: 'code-1', domain: 'code', day: 1, title: 'x', locale: 'hu', summary: [], terms: [], watchOut: [], userNote: '', createdAt: '2026-09-28' }],
      days: 'corrupt',
    };
    const { state, recovered } = migrate(partial);
    expect(state.xp).toBe(55);
    expect(state.notes).toHaveLength(1);
    expect(state.days).toEqual({});
    expect(recovered).toBe(true);
  });

  it('rejects an unknown locale rather than rendering a blank UI', () => {
    const { state, recovered } = migrate({ ...defaultState(), locale: 'klingon' });
    expect(state.locale).toBe('hu');
    expect(recovered).toBe(true);
  });

  it('rejects a negative xp value', () => {
    const { state } = migrate({ ...defaultState(), xp: -5 });
    expect(state.xp).toBe(0);
  });

  it('drops reward ids that are not strings', () => {
    const { state } = migrate({ ...defaultState(), rewards: ['theme-amber', 7, null] });
    expect(state.rewards).toEqual(['theme-amber']);
  });
});
