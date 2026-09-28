import { describe, expect, it } from 'vitest';
import type { NoteSource, Question } from '../../content/types';
import { buildNote, notesToMarkdown, searchNotes, setUserNote, upsertNote } from '../notebook';

const source: NoteSource = {
  summary: ['A változó adatot tárol.', 'A típus meghatározza a műveleteket.'],
  terms: [{ term: 'változó', def: 'Névvel ellátott tárolóhely a memóriában.' }],
  formulas: [{ tex: 'v = s/t', meaning: 'A sebesség út per idő.' }],
};

const questions: Question[] = [
  { k: 'single', q: 'Mi a változó?', opts: ['a', 'b'], answer: 0, why: 'Mert névvel hivatkozol egy értékre.' },
  { k: 'single', q: 'Mi a típus?', opts: ['a', 'b'], answer: 1, why: 'A típus dönti el, mit lehet vele csinálni.' },
];

const args = {
  domain: 'code' as const,
  day: 1,
  title: 'Változók',
  locale: 'hu' as const,
  source,
  today: '2026-09-28',
};

const LABELS = { watchOut: 'Figyelj erre!', terms: 'Fogalmak', myNote: 'Saját jegyzet', formulas: 'Képletek', day: 'nap' };

describe('buildNote', () => {
  it('carries the authored summary, terms and formulas', () => {
    const n = buildNote({ ...args, questions, wrongIndexes: [] });
    expect(n.summary).toHaveLength(2);
    expect(n.terms[0].term).toBe('változó');
    expect(n.formulas?.[0].tex).toBe('v = s/t');
    expect(n.id).toBe('code-1');
    expect(n.createdAt).toBe('2026-09-28');
  });

  it('omits the watch-out block on a perfect quiz', () => {
    expect(buildNote({ ...args, questions, wrongIndexes: [] }).watchOut).toEqual([]);
  });

  it('adds the explanation of every wrong answer', () => {
    const n = buildNote({ ...args, questions, wrongIndexes: [1] });
    expect(n.watchOut).toEqual(['A típus dönti el, mit lehet vele csinálni.']);
  });

  it('keeps the wrong answers in question order', () => {
    const n = buildNote({ ...args, questions, wrongIndexes: [1, 0] });
    expect(n.watchOut).toEqual([
      'Mert névvel hivatkozol egy értékre.',
      'A típus dönti el, mit lehet vele csinálni.',
    ]);
  });

  it('ignores an out-of-range wrong index instead of crashing', () => {
    expect(buildNote({ ...args, questions, wrongIndexes: [9] }).watchOut).toEqual([]);
  });
});

describe('upsertNote', () => {
  it('replaces an existing note but keeps the user annotation', () => {
    const first = buildNote({ ...args, questions, wrongIndexes: [1] });
    let notes = upsertNote([], first);
    notes = setUserNote(notes, 'code-1', 'Ezt még gyakorolni kell.');
    notes = upsertNote(notes, buildNote({ ...args, questions, wrongIndexes: [] }));
    expect(notes).toHaveLength(1);
    expect(notes[0].watchOut).toEqual([]);
    expect(notes[0].userNote).toBe('Ezt még gyakorolni kell.');
  });

  it('keeps notes ordered by track then day', () => {
    const d2 = buildNote({ ...args, day: 2, title: 'Elágazás', questions, wrongIndexes: [] });
    const d1 = buildNote({ ...args, questions, wrongIndexes: [] });
    const notes = upsertNote(upsertNote([], d2), d1);
    expect(notes.map((n) => n.day)).toEqual([1, 2]);
  });

  it('leaves the list untouched when setting a note on an unknown id', () => {
    const notes = upsertNote([], buildNote({ ...args, questions, wrongIndexes: [] }));
    expect(setUserNote(notes, 'nope', 'x')).toEqual(notes);
  });
});

describe('searchNotes', () => {
  const withWrong = [buildNote({ ...args, questions, wrongIndexes: [1] })];
  const clean = [buildNote({ ...args, questions, wrongIndexes: [] })];

  it('matches on summary text, case- and accent-insensitively', () => {
    expect(searchNotes(withWrong, 'VALTOZO')).toHaveLength(1);
  });

  it('matches on a term definition', () => {
    expect(searchNotes(withWrong, 'tárolóhely')).toHaveLength(1);
  });

  it('matches on the title', () => {
    expect(searchNotes(withWrong, 'Változók')).toHaveLength(1);
  });

  it('matches on the learner own annotation', () => {
    const annotated = setUserNote(withWrong, 'code-1', 'kondenzátor');
    expect(searchNotes(annotated, 'kondenzator')).toHaveLength(1);
  });

  it('returns nothing for a term that appears nowhere', () => {
    expect(searchNotes(withWrong, 'szervomotor')).toHaveLength(0);
  });

  it('returns everything for an empty query', () => {
    expect(searchNotes(withWrong, '  ')).toHaveLength(1);
  });

  it('filters to notes with a watch-out block', () => {
    expect(searchNotes(withWrong, '', { onlyWatchOut: true })).toHaveLength(1);
    expect(searchNotes(clean, '', { onlyWatchOut: true })).toHaveLength(0);
  });

  it('filters by track', () => {
    expect(searchNotes(withWrong, '', { domain: 'physics' })).toHaveLength(0);
    expect(searchNotes(withWrong, '', { domain: 'code' })).toHaveLength(1);
  });
});

describe('notesToMarkdown', () => {
  it('produces a heading per note and includes every section', () => {
    let notes = upsertNote([], buildNote({ ...args, questions, wrongIndexes: [1] }));
    notes = setUserNote(notes, 'code-1', 'Holnap újranézem.');
    const md = notesToMarkdown(notes, LABELS);
    expect(md).toContain('## 1. nap — Változók');
    expect(md).toContain('Figyelj erre!');
    expect(md).toContain('A típus dönti el');
    expect(md).toContain('| változó |');
    expect(md).toContain('Holnap újranézem.');
    expect(md).toContain('v = s/t');
  });

  it('leaves out the empty sections', () => {
    const notes = upsertNote([], buildNote({ ...args, questions, wrongIndexes: [] }));
    const md = notesToMarkdown(notes, LABELS);
    expect(md).not.toContain('Figyelj erre!');
    expect(md).not.toContain('Saját jegyzet');
  });

  it('returns an empty string for no notes rather than a stray heading', () => {
    expect(notesToMarkdown([], LABELS).trim()).toBe('');
  });
});
