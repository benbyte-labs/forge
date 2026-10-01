import { ALL_DOMAINS, type Domain } from '../content/types';
import { isISODate } from './dates';
import type { AppState, DayProgress, Locale, SrsItem, StoredNote, ThemeId } from './types';

export const SCHEMA_VERSION = 1;
const STORAGE_KEY = 'forge.state.v1';

const LOCALES: Locale[] = ['hu', 'en', 'de', 'es'];
const THEMES: ThemeId[] = ['cyan', 'amber', 'void', 'light'];

export function defaultState(): AppState {
  return {
    version: SCHEMA_VERSION,
    locale: 'hu',
    theme: 'cyan',
    motion: true,
    activeTrack: null,
    days: {},
    xp: 0,
    streak: { current: 0, best: 0, lastCompletedDate: null, freezes: 0, freezeUsedOn: null },
    rewards: [],
    srs: [],
    notes: [],
    codeDrafts: {},
    robotSkin: 'default',
  };
}

// ── Field guards ─────────────────────────────────────────────────────
//
// Every guard takes the raw value and a fallback. When the value is not what
// it should be, the fallback is used and the caller is told something was
// recovered. Nothing here throws: a damaged save must still open the app.

class Recovery {
  dirty = false;
  note() {
    this.dirty = true;
  }
}

function num(v: unknown, fallback: number, r: Recovery, min = -Infinity): number {
  if (typeof v === 'number' && Number.isFinite(v) && v >= min) return v;
  r.note();
  return fallback;
}

function bool(v: unknown, fallback: boolean, r: Recovery): boolean {
  if (typeof v === 'boolean') return v;
  r.note();
  return fallback;
}

function oneOf<T extends string>(v: unknown, allowed: T[], fallback: T, r: Recovery): T {
  if (typeof v === 'string' && (allowed as string[]).includes(v)) return v as T;
  r.note();
  return fallback;
}

function strings(v: unknown, r: Recovery): string[] {
  if (!Array.isArray(v)) {
    r.note();
    return [];
  }
  const out = v.filter((x): x is string => typeof x === 'string');
  if (out.length !== v.length) r.note();
  return out;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function dayProgress(v: unknown): DayProgress | null {
  if (!isRecord(v)) return null;
  const acc = v.quizAccuracy;
  return {
    lessonDone: v.lessonDone === true,
    labDone: v.labDone === true,
    quizAccuracy: typeof acc === 'number' && Number.isFinite(acc) ? Math.max(0, Math.min(1, acc)) : null,
    completedOn: isISODate(v.completedOn) ? v.completedOn : null,
  };
}

function daysMap(v: unknown, r: Recovery): Record<string, DayProgress> {
  if (!isRecord(v)) {
    r.note();
    return {};
  }
  const out: Record<string, DayProgress> = {};
  for (const [key, raw] of Object.entries(v)) {
    const p = dayProgress(raw);
    if (p) out[key] = p;
    else r.note();
  }
  return out;
}

function draftsMap(v: unknown, r: Recovery): Record<string, string> {
  if (!isRecord(v)) {
    r.note();
    return {};
  }
  const out: Record<string, string> = {};
  for (const [key, raw] of Object.entries(v)) {
    if (typeof raw === 'string') out[key] = raw;
    else r.note();
  }
  return out;
}

function domain(v: unknown): Domain | null {
  return typeof v === 'string' && (ALL_DOMAINS as string[]).includes(v) ? (v as Domain) : null;
}

function srsList(v: unknown, r: Recovery): SrsItem[] {
  if (!Array.isArray(v)) {
    r.note();
    return [];
  }
  const out: SrsItem[] = [];
  for (const raw of v) {
    if (!isRecord(raw)) continue;
    const d = domain(raw.domain);
    if (typeof raw.id !== 'string' || !d || !isISODate(raw.due)) continue;
    out.push({
      id: raw.id,
      domain: d,
      day: typeof raw.day === 'number' ? raw.day : 0,
      qIndex: typeof raw.qIndex === 'number' ? raw.qIndex : 0,
      stage: typeof raw.stage === 'number' ? raw.stage : 0,
      due: raw.due,
    });
  }
  if (out.length !== v.length) r.note();
  return out;
}

function notesList(v: unknown, r: Recovery): StoredNote[] {
  if (!Array.isArray(v)) {
    r.note();
    return [];
  }
  const out: StoredNote[] = [];
  for (const raw of v) {
    if (!isRecord(raw)) continue;
    const d = domain(raw.domain);
    if (typeof raw.id !== 'string' || !d) continue;
    const terms = Array.isArray(raw.terms)
      ? raw.terms.filter(
          (t): t is { term: string; def: string } =>
            isRecord(t) && typeof t.term === 'string' && typeof t.def === 'string',
        )
      : [];
    out.push({
      id: raw.id,
      domain: d,
      day: typeof raw.day === 'number' ? raw.day : 0,
      title: typeof raw.title === 'string' ? raw.title : raw.id,
      locale: (LOCALES as string[]).includes(raw.locale as string) ? (raw.locale as Locale) : 'hu',
      summary: Array.isArray(raw.summary) ? raw.summary.filter((s): s is string => typeof s === 'string') : [],
      terms,
      watchOut: Array.isArray(raw.watchOut) ? raw.watchOut.filter((s): s is string => typeof s === 'string') : [],
      userNote: typeof raw.userNote === 'string' ? raw.userNote : '',
      createdAt: isISODate(raw.createdAt) ? raw.createdAt : '',
    });
  }
  if (out.length !== v.length) r.note();
  return out;
}

/**
 * Turn whatever was on disk into a usable state.
 *
 * `recovered` is true when anything had to be replaced — the UI shows a notice
 * so the learner knows why something looks reset, rather than silently losing
 * a streak and wondering.
 */
export function migrate(raw: unknown): { state: AppState; recovered: boolean } {
  if (raw === null || raw === undefined) return { state: defaultState(), recovered: false };

  const r = new Recovery();
  if (!isRecord(raw)) return { state: defaultState(), recovered: true };

  const d = defaultState();
  const s = raw.streak;
  const streakRaw = isRecord(s) ? s : ({} as Record<string, unknown>);
  if (!isRecord(s) && s !== undefined) r.note();

  const state: AppState = {
    version: SCHEMA_VERSION,
    locale: oneOf(raw.locale ?? d.locale, LOCALES, d.locale, r),
    theme: oneOf(raw.theme ?? d.theme, THEMES, d.theme, r),
    motion: bool(raw.motion ?? d.motion, d.motion, r),
    activeTrack: domain(raw.activeTrack),
    days: raw.days === undefined ? {} : daysMap(raw.days, r),
    xp: Math.floor(num(raw.xp ?? 0, 0, r, 0)),
    streak: {
      current: Math.floor(num(streakRaw.current ?? 0, 0, r, 0)),
      best: Math.floor(num(streakRaw.best ?? 0, 0, r, 0)),
      lastCompletedDate: isISODate(streakRaw.lastCompletedDate) ? streakRaw.lastCompletedDate : null,
      freezes: Math.floor(num(streakRaw.freezes ?? 0, 0, r, 0)),
      freezeUsedOn: isISODate(streakRaw.freezeUsedOn) ? streakRaw.freezeUsedOn : null,
    },
    rewards: raw.rewards === undefined ? [] : strings(raw.rewards, r),
    srs: raw.srs === undefined ? [] : srsList(raw.srs, r),
    notes: raw.notes === undefined ? [] : notesList(raw.notes, r),
    codeDrafts: raw.codeDrafts === undefined ? {} : draftsMap(raw.codeDrafts, r),
    robotSkin: typeof raw.robotSkin === 'string' ? raw.robotSkin : d.robotSkin,
  };

  // A save written by an older schema is upgraded, not "recovered": nothing the
  // learner did was lost, the file simply predates a field, so it raises no
  // notice. Anything else that had to be replaced does.
  const olderSchema = typeof raw.version === 'number' && raw.version < SCHEMA_VERSION;
  if (olderSchema) return { state, recovered: false };

  const unknownVersion = raw.version !== SCHEMA_VERSION;
  return { state, recovered: r.dirty || unknownVersion };
}

// ── Persistence port ─────────────────────────────────────────────────

export interface StoragePort {
  load(): Promise<string | null>;
  save(text: string): Promise<void>;
  backup(text: string): Promise<void>;
  describe(): string;
}

function isTauri(): boolean {
  return typeof globalThis === 'object' && '__TAURI_INTERNALS__' in globalThis;
}

function webStorage(): StoragePort {
  return {
    async load() {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch {
        return null;
      }
    },
    async save(text) {
      try {
        localStorage.setItem(STORAGE_KEY, text);
      } catch {
        /* private mode, quota — the app keeps working, just unsaved */
      }
    },
    async backup(text) {
      try {
        localStorage.setItem(`${STORAGE_KEY}.broken`, text);
      } catch {
        /* nothing more we can do */
      }
    },
    describe: () => 'localStorage',
  };
}

function tauriStorage(): StoragePort {
  // Imported lazily so the browser build never pulls in the Tauri API, and so
  // the engine-purity check sees no static platform import.
  const core = () => import('@tauri-apps/api/core');
  return {
    async load() {
      const { invoke } = await core();
      return (await invoke<string | null>('load_state')) ?? null;
    },
    async save(text) {
      const { invoke } = await core();
      await invoke('save_state', { text });
    },
    async backup(text) {
      const { invoke } = await core();
      await invoke('backup_state', { text });
    },
    describe: () => 'state.json',
  };
}

export function createStorage(): StoragePort {
  return isTauri() ? tauriStorage() : webStorage();
}

/** Parse saved text into a state, tolerating anything that is not valid JSON. */
export function parseState(text: string | null): { state: AppState; recovered: boolean } {
  if (text === null) return { state: defaultState(), recovered: false };
  try {
    return migrate(JSON.parse(text));
  } catch {
    return { state: defaultState(), recovered: true };
  }
}
