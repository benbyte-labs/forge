import { describe, expect, it } from 'vitest';
import { hu } from '../ui/hu';
import { en } from '../ui/en';
import { de } from '../ui/de';
import { es } from '../ui/es';
import { translate } from '../index';

/** Languages beyond the primary pair may be partial; English fills the gaps. */
const SECONDARY = { de, es } as const;

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

describe('secondary languages', () => {
  for (const [name, dict] of Object.entries(SECONDARY)) {
    it(`${name} invents no key the primary pair does not have`, () => {
      for (const key of Object.keys(dict)) {
        expect(hu, `${name} has an unknown key: ${key}`).toHaveProperty(key);
      }
    });

    it(`${name} has no empty strings`, () => {
      for (const [key, value] of Object.entries(dict)) {
        expect(value?.trim(), `empty ${name} translation for ${key}`).not.toBe('');
      }
    });

    it(`${name} keeps the same placeholders as the primary`, () => {
      const vars = (s: string) => (s.match(/\{(\w+)\}/g) ?? []).sort();
      for (const [key, value] of Object.entries(dict)) {
        expect(vars(value!), `placeholder mismatch in ${name} for ${key}`).toEqual(
          vars(hu[key as keyof typeof hu]),
        );
      }
    });

    it(`${name} translates the navigation a learner sees first`, () => {
      for (const key of ['nav.dashboard', 'nav.tracks', 'nav.settings', 'path.start']) {
        expect(dict[key as keyof typeof dict], `${name} is missing ${key}`).toBeDefined();
      }
    });
  }

  it('falls back to English for a key a language has not translated', () => {
    // A key present in English but deliberately absent from the German dictionary.
    expect(translate('de', 'quiz.whatPrints')).toBe(de['quiz.whatPrints'] ?? en['quiz.whatPrints']);
    expect(translate('de', 'nope.nope')).toBe('nope.nope');
  });
});
