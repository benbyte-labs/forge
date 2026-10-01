import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { Locale } from '../engine/types';
import { de } from './ui/de';
import { en } from './ui/en';
import { es } from './ui/es';
import { hu, type UiKey } from './ui/hu';

export type { Locale };
export const LOCALES: Locale[] = ['hu', 'en', 'de', 'es'];
export const LOCALE_NAMES: Record<Locale, string> = {
  hu: 'Magyar',
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
};
export const LOCALE_FLAGS: Record<Locale, string> = { hu: '🇭🇺', en: '🇬🇧', de: '🇩🇪', es: '🇪🇸' };

export type { UiKey };

type Vars = Record<string, string | number>;

const DICTS: Record<Locale, Partial<Record<string, string>>> = { hu, en, de, es };

/** What an untranslated key falls back to before giving up. */
const UI_FALLBACK: Locale = 'en';

/**
 * Look a key up, falling back to English and finally to the key itself.
 *
 * The fallback is what lets a language be added a few hundred strings at a
 * time: anything not yet translated reads in English rather than appearing as
 * a blank or a raw key. An unknown key shows as itself, which makes a typo
 * obvious on screen instead of silently rendering nothing. An unsupplied
 * placeholder stays as `{name}` for the same reason.
 */
export function translate(locale: Locale, key: string, vars?: Vars): string {
  const raw = DICTS[locale]?.[key] ?? DICTS[UI_FALLBACK][key];
  if (raw === undefined) return key;
  if (!vars) return raw;
  return raw.replace(/\{(\w+)\}/g, (_, name: string) =>
    vars[name] === undefined ? `{${name}}` : String(vars[name]),
  );
}

export type T = (key: UiKey | string, vars?: Vars) => string;

interface I18nValue {
  locale: Locale;
  t: T;
}

const I18nContext = createContext<I18nValue>({
  locale: 'hu',
  t: (key, vars) => translate('hu', key, vars),
});

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo<I18nValue>(
    () => ({ locale, t: (key, vars) => translate(locale, key, vars) }),
    [locale],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  return useContext(I18nContext);
}

export function useT(): T {
  return useContext(I18nContext).t;
}
