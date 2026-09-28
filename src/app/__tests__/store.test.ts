import { beforeEach, describe, expect, it } from 'vitest';
import { useStore } from '../store';

/** Day 1 of the code track: the correct answers, so tests can pass or fail on purpose. */
const CODE_DAY1_CORRECT = [1, 1, 2, [1, 3], 11];
const CODE_DAY1_WRONG = [0, 0, 0, [0], 0];

beforeEach(() => {
  localStorage.clear();
  useStore.getState().resetForTest();
});

describe('store: finishing a day', () => {
  it('records the lesson and writes a note once the quiz is submitted', () => {
    const s = useStore.getState();
    s.completeLesson('code', 1);
    s.submitQuiz('code', 1, CODE_DAY1_CORRECT);
    const after = useStore.getState().state;
    expect(after.days['code-1'].lessonDone).toBe(true);
    expect(after.notes.some((n) => n.id === 'code-1')).toBe(true);
  });

  it('writes the note even when the quiz was failed, with a watch-out block', () => {
    const s = useStore.getState();
    s.completeLesson('code', 1);
    s.submitQuiz('code', 1, CODE_DAY1_WRONG);
    const note = useStore.getState().state.notes.find((n) => n.id === 'code-1')!;
    expect(note).toBeDefined();
    expect(note.watchOut.length).toBeGreaterThan(0);
  });

  it('queues every wrong question for review', () => {
    const s = useStore.getState();
    s.completeLesson('code', 1);
    s.submitQuiz('code', 1, CODE_DAY1_WRONG);
    expect(useStore.getState().state.srs.length).toBeGreaterThan(0);
  });

  it('starts the streak when the day is completed', () => {
    const s = useStore.getState();
    s.completeLesson('code', 1);
    s.submitQuiz('code', 1, CODE_DAY1_CORRECT);
    expect(useStore.getState().state.streak.current).toBe(1);
  });

  it('does not start the streak on a failed quiz', () => {
    const s = useStore.getState();
    s.completeLesson('code', 1);
    s.submitQuiz('code', 1, CODE_DAY1_WRONG);
    expect(useStore.getState().state.streak.current).toBe(0);
  });

  it('awards xp for the lesson and the quiz', () => {
    const s = useStore.getState();
    s.completeLesson('code', 1);
    s.submitQuiz('code', 1, CODE_DAY1_CORRECT);
    expect(useStore.getState().state.xp).toBeGreaterThan(0);
  });

  it('writes the note in the language that was active', () => {
    const s = useStore.getState();
    s.setLocale('en');
    s.completeLesson('code', 1);
    s.submitQuiz('code', 1, CODE_DAY1_CORRECT);
    const note = useStore.getState().state.notes.find((n) => n.id === 'code-1')!;
    expect(note.locale).toBe('en');
    expect(note.title).toBe('Variables and types');
  });

  it('ignores a submission for a day that does not exist', () => {
    expect(() => useStore.getState().submitQuiz('code', 99, [])).not.toThrow();
    expect(useStore.getState().state.notes).toHaveLength(0);
  });
});

describe('store: annotations and persistence', () => {
  it('saves a personal annotation on a note', () => {
    const s = useStore.getState();
    s.completeLesson('code', 1);
    s.submitQuiz('code', 1, CODE_DAY1_CORRECT);
    s.saveUserNote('code-1', 'Holnap átnézem.');
    expect(useStore.getState().state.notes[0].userNote).toBe('Holnap átnézem.');
  });

  it('persists and rehydrates', async () => {
    useStore.getState().completeLesson('code', 1);
    await useStore.getState().flush();
    useStore.getState().resetForTest();
    expect(useStore.getState().state.days['code-1']).toBeUndefined();
    await useStore.getState().hydrate();
    expect(useStore.getState().state.days['code-1']).toBeDefined();
  });

  it('starts clean rather than throwing when the stored data is corrupt', async () => {
    localStorage.setItem('forge.state.v1', '{not json');
    await useStore.getState().hydrate();
    expect(useStore.getState().state.xp).toBe(0);
    expect(useStore.getState().notices.some((n) => n.kind === 'recovered')).toBe(true);
  });
});

describe('store: rewards', () => {
  it('unlocks the day-3 theme once a three-day streak is reached', () => {
    useStore.getState().setStreakForTest(2, '2026-09-27');
    const s = useStore.getState();
    s.completeLesson('code', 1);
    s.submitQuiz('code', 1, CODE_DAY1_CORRECT, '2026-09-28');
    const after = useStore.getState();
    expect(after.state.streak.current).toBe(3);
    expect(after.state.rewards).toContain('theme-amber');
    expect(after.notices.some((n) => n.kind === 'reward')).toBe(true);
  });

  it('refuses a theme that has not been unlocked', () => {
    useStore.getState().setTheme('void');
    expect(useStore.getState().state.theme).toBe('cyan');
  });

  it('accepts a theme that is unlocked', () => {
    useStore.getState().setTheme('light');
    expect(useStore.getState().state.theme).toBe('light');
  });
});

describe('store: today mission', () => {
  it('points at day 1 of the active track when nothing is done', () => {
    useStore.getState().setActiveTrack('code');
    expect(useStore.getState().todayMission()?.day).toBe(1);
  });

  it('advances to the next unfinished day', () => {
    const s = useStore.getState();
    s.setActiveTrack('code');
    s.completeLesson('code', 1);
    s.submitQuiz('code', 1, CODE_DAY1_CORRECT);
    expect(useStore.getState().todayMission()?.day).toBe(2);
  });
});
