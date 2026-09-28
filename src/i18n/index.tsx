import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { en } from './ui/en';
import { hu, type UiKey } from './ui/hu';

export type Locale = 'hu' | 'en';
export const LOCALES: Locale[] = ['hu', 'en'];
export const LOCALE_NAMES: Record<Locale, string> = { hu: 'Magyar', en: 'English' };

export type { UiKey };

type Vars = Record<string, string | number>;

const DICTS: Record<Locale, Record<string, string>> = { hu, en };

/**
 * Look a key up in one locale. An unknown key returns the key itself, so a
 * missing translation shows up as a visible `some.key` rather than a blank
 * space or a crash. An unsupplied placeholder stays as `{name}` for the same
 * reason — `undefined` in the middle of a sentence tells the reader nothing.
 */
export function translate(locale: Locale, key: string, vars?: Vars): string {
  const raw = DICTS[locale]?.[key];
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
