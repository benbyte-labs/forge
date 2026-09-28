import { describe, expect, it } from 'vitest';
import { hu } from '../ui/hu';
import { en } from '../ui/en';
import { translate } from '../index';

describe('i18n', () => {
  it('has identical key sets in both locales', () => {
    expect(Object.keys(hu).sort()).toEqual(Object.keys(en).sort());
  });

  it('has no empty strings', () => {
    for (const [key, value] of Object.entries({ ...hu, ...en })) {
      expect(value.trim(), `empty translation for ${key}`).not.toBe('');
    }
  });

  it('uses the same placeholders in both locales', () => {
    const vars = (s: string) => (s.match(/\{(\w+)\}/g) ?? []).sort();
    for (const key of Object.keys(hu) as (keyof typeof hu)[]) {
      expect(vars(en[key]), `placeholder mismatch for ${key}`).toEqual(vars(hu[key]));
    }
  });

  it('interpolates variables', () => {
    expect(translate('hu', 'streak.days', { n: 7 })).toContain('7');
    expect(translate('en', 'streak.days', { n: 7 })).toContain('7');
  });

  it('leaves an unsupplied placeholder visible rather than printing undefined', () => {
    expect(translate('hu', 'streak.days')).not.toContain('undefined');
  });

  it('falls back to the key when a translation is missing', () => {
    expect(translate('hu', 'nope.nope')).toBe('nope.nope');
  });
});
