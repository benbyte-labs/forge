import { create } from 'zustand';
import { getDay, getTrack, TRACK_LENGTH, type Domain } from '../content';
import { buildNote, notesToMarkdown, searchNotes, setUserNote, type NoteFilter } from '../engine/notebook';
import { today as todayISO } from '../engine/dates';
import {
  awardLab,
  awardLesson,
  awardQuiz,
  countCompletedInTrack,
  dayKey,
  isDayComplete,
  markCompletedOn,
} from '../engine/progress';
import { gradeQuiz, type Answer } from '../engine/quiz';
import { availableThemes, checkBadges, unlockFor, type Reward } from '../engine/rewards';
import { answerReview, dueToday, scheduleWrong, srsId } from '../engine/srs';
import { createStorage, defaultState, parseState } from '../engine/storage';
import { recordDayComplete, reconcile } from '../engine/streak';
import type { AppState, Locale, ThemeId } from '../engine/types';

export type Notice =
  | { kind: 'recovered' }
  | { kind: 'freeze' }
  | { kind: 'broken'; after: number }
  | { kind: 'milestone'; day: number }
  | { kind: 'reward'; reward: Reward };

export interface Mission {
  domain: Domain;
  day: number;
  title: string;
  minutes: number;
  hasLab: boolean;
  lessonDone: boolean;
  quizDone: boolean;
  labDone: boolean;
}

interface Store {
  state: AppState;
  ready: boolean;
  notices: Notice[];

  // lifecycle
  hydrate(): Promise<void>;
  flush(): Promise<void>;
  resetForTest(): void;
  setStreakForTest(current: number, lastCompletedDate: string): void;

  // settings
  setLocale(locale: Locale): void;
  setTheme(theme: ThemeId): void;
  setMotion(on: boolean): void;
  setActiveTrack(domain: Domain | null): void;
  setRobotSkin(skin: string): void;

  // learning
  completeLesson(domain: Domain, day: number, when?: string): void;
  submitQuiz(domain: Domain, day: number, answers: Answer[], when?: string): void;
  completeLab(domain: Domain, day: number, when?: string): void;
  reviewAnswered(id: string, correct: boolean, when?: string): void;
  saveDraft(key: string, code: string): void;

  // notebook
  saveUserNote(id: string, text: string): void;
  notesMarkdown(filter?: NoteFilter, query?: string): string;

  // data
  exportBackup(): string;
  importBackup(json: string): boolean;
  resetAll(): void;

  // ui
  dismissNotice(index: number): void;
  todayMission(): Mission | null;
  dueReviews(when?: string): ReturnType<typeof dueToday>;
  isDayUnlocked(domain: Domain, day: number): boolean;
  trackProgress(domain: Domain): { done: number; total: number; written: number };
}

const storage = createStorage();

let pending: ReturnType<typeof setTimeout> | null = null;
let inFlight: Promise<void> = Promise.resolve();

function schedulePersist(state: AppState) {
  if (pending) clearTimeout(pending);
  pending = setTimeout(() => {
    pending = null;
    inFlight = storage.save(JSON.stringify(state));
  }, 400);
}

export const useStore = create<Store>((set, get) => {
  /** Apply a state change and queue it for saving. */
  const apply = (next: AppState, notices: Notice[] = []) => {
    set((s) => ({ state: next, notices: notices.length ? [...s.notices, ...notices] : s.notices }));
    schedulePersist(next);
  };

  return {
    state: defaultState(),
    ready: false,
    notices: [],

    async hydrate() {
      const raw = await storage.load();
      const { state, recovered } = parseState(raw);
      if (recovered && raw) await storage.backup(raw);

      const notices: Notice[] = recovered ? [{ kind: 'recovered' }] : [];

      const r = reconcile(state.streak, todayISO());
      if (r.freezeSpent) notices.push({ kind: 'freeze' });
      if (r.brokenAfter > 0) notices.push({ kind: 'broken', after: r.brokenAfter });

      set({ state: { ...state, streak: r.streak }, ready: true, notices });
      if (recovered || r.freezeSpent || r.brokenAfter > 0) schedulePersist({ ...state, streak: r.streak });
    },

    async flush() {
      if (pending) {
        clearTimeout(pending);
        pending = null;
        inFlight = storage.save(JSON.stringify(get().state));
      }
      await inFlight;
    },

    resetForTest() {
      if (pending) {
        clearTimeout(pending);
        pending = null;
      }
      set({ state: defaultState(), ready: true, notices: [] });
    },

    setStreakForTest(current, lastCompletedDate) {
      set((s) => ({ state: { ...s.state, streak: { ...s.state.streak, current, best: current, lastCompletedDate } } }));
    },

    // ── settings ───────────────────────────────────────────────────

    setLocale(locale) {
      apply({ ...get().state, locale });
    },

    setTheme(theme) {
      const s = get().state;
      // A theme that has not been earned is not applied — otherwise the reward
      // would be meaningless the moment someone opened Settings.
      if (!availableThemes(s).includes(theme)) return;
      apply({ ...s, theme });
    },

    setMotion(on) {
      apply({ ...get().state, motion: on });
    },

    setActiveTrack(domain) {
      apply({ ...get().state, activeTrack: domain });
    },

    setRobotSkin(skin) {
      apply({ ...get().state, robotSkin: skin });
    },

    // ── learning ───────────────────────────────────────────────────

    completeLesson(domain, day, when = todayISO()) {
      const s = get().state;
      const next = awardLesson(s, domain, day);
      apply(...finishDayIfComplete(next, domain, day, when));
    },

    submitQuiz(domain, day, answers, when = todayISO()) {
      const s = get().state;
      const content = getDay(domain, s.locale, day);
      if (!content) return;

      const result = gradeQuiz(content.quiz, answers);

      let next = awardQuiz(s, domain, day, result.accuracy);

      // Everything the learner got wrong comes back later.
      let srs = next.srs;
      for (const i of result.wrongIndexes) {
        srs = scheduleWrong(srs, { id: srsId(domain, day, i), domain, day, qIndex: i }, when);
      }

      // The note is written whichever way the quiz went. Someone who just got
      // the questions wrong is exactly who needs the study material.
      const note = buildNote({
        domain,
        day,
        title: content.title,
        locale: s.locale,
        source: content.note,
        questions: content.quiz,
        wrongIndexes: result.wrongIndexes,
        today: when,
      });

      next = { ...next, srs, notes: upsert(next.notes, note) };
      apply(...finishDayIfComplete(next, domain, day, when));
    },

    completeLab(domain, day, when = todayISO()) {
      const next = awardLab(get().state, domain, day);
      apply(...finishDayIfComplete(next, domain, day, when));
    },

    reviewAnswered(id, correct, when = todayISO()) {
      const s = get().state;
      apply({ ...s, srs: answerReview(s.srs, id, correct, when) });
    },

    saveDraft(key, code) {
      const s = get().state;
      apply({ ...s, codeDrafts: { ...s.codeDrafts, [key]: code } });
    },

    // ── notebook ───────────────────────────────────────────────────

    saveUserNote(id, text) {
      const s = get().state;
      apply({ ...s, notes: setUserNote(s.notes, id, text) });
    },

    notesMarkdown(filter = {}, query = '') {
      const s = get().state;
      const notes = searchNotes(s.notes, query, filter);
      const labels =
        s.locale === 'hu'
          ? { watchOut: 'Figyelj erre!', terms: 'Fogalmak', myNote: 'Saját jegyzet', formulas: 'Képletek', day: 'nap' }
          : { watchOut: 'Watch out!', terms: 'Terms', myNote: 'My note', formulas: 'Formulas', day: 'day' };
      return notesToMarkdown(notes, labels);
    },

    // ── data ───────────────────────────────────────────────────────

    exportBackup() {
      return JSON.stringify(get().state, null, 2);
    },

    importBackup(json) {
      const { state, recovered } = parseState(json);
      if (recovered) return false;
      apply(state);
      return true;
    },

    resetAll() {
      apply(defaultState());
    },

    // ── ui ─────────────────────────────────────────────────────────

    dismissNotice(index) {
      set((s) => ({ notices: s.notices.filter((_, i) => i !== index) }));
    },

    todayMission() {
      const s = get().state;
      const domain = s.activeTrack;
      if (!domain) return null;
      const track = getTrack(domain, s.locale);
      for (const d of track.days) {
        const p = s.days[dayKey(domain, d.day)];
        if (isDayComplete(p)) continue;
        return {
          domain,
          day: d.day,
          title: d.title,
          minutes: d.minutes,
          hasLab: !!d.lab,
          lessonDone: !!p?.lessonDone,
          quizDone: p?.quizAccuracy !== null && p?.quizAccuracy !== undefined,
          labDone: !!p?.labDone,
        };
      }
      return null;
    },

    dueReviews(when = todayISO()) {
      return dueToday(get().state.srs, when);
    },

    isDayUnlocked(domain, day) {
      if (day <= 1) return true;
      return isDayComplete(get().state.days[dayKey(domain, day - 1)]);
    },

    trackProgress(domain) {
      const s = get().state;
      return {
        done: countCompletedInTrack(s, domain),
        total: TRACK_LENGTH,
        written: getTrack(domain, s.locale).days.length,
      };
    },
  };
});

function upsert(notes: AppState['notes'], note: AppState['notes'][number]): AppState['notes'] {
  const existing = notes.find((n) => n.id === note.id);
  const merged = existing ? { ...note, userNote: existing.userNote } : note;
  return [...notes.filter((n) => n.id !== note.id), merged].sort((a, b) =>
    a.domain === b.domain ? a.day - b.day : a.domain.localeCompare(b.domain),
  );
}

/**
 * When a day has just become complete, stamp it, advance the streak, and hand
 * out whatever that unlocked. Returns the pair `apply` wants.
 */
function finishDayIfComplete(
  state: AppState,
  domain: Domain,
  day: number,
  when: string,
): [AppState, Notice[]] {
  const notices: Notice[] = [];
  const key = dayKey(domain, day);
  const wasStamped = !!state.days[key]?.completedOn;

  let next = markCompletedOn(state, domain, day, when);
  const justFinished = !wasStamped && !!next.days[key]?.completedOn;

  if (justFinished) {
    const { streak, milestone } = recordDayComplete(next.streak, when);
    next = { ...next, streak };
    if (milestone) notices.push({ kind: 'milestone', day: milestone });

    const unlocked = unlockFor(streak.current, next.rewards);
    if (unlocked.length) {
      next = { ...next, rewards: [...next.rewards, ...unlocked.map((r) => r.id)] };
      for (const r of unlocked) notices.push({ kind: 'reward', reward: r });
    }
  }

  const badges = checkBadges(next);
  if (badges.length) {
    next = { ...next, rewards: [...next.rewards, ...badges.map((b) => b.id)] };
    for (const b of badges) notices.push({ kind: 'reward', reward: b });
  }

  return [next, notices];
}
