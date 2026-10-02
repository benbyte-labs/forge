import { describe, expect, it } from 'vitest';
import { ALL_DOMAINS, TRACK_LENGTH } from '../types';
import { getTrack } from '../index';
import { SCENE_IDS } from '../../features/robotlab/scenes';
import { SIM_IDS } from '../../features/physicslab/sims';
import type { Locale } from '../../engine/types';

const LOCALES: Locale[] = ['hu', 'en'];

describe('content', () => {
  for (const domain of ALL_DOMAINS) {
    it(`${domain}: hu and en have the same day numbers`, () => {
      expect(getTrack(domain, 'hu').days.map((d) => d.day)).toEqual(
        getTrack(domain, 'en').days.map((d) => d.day),
      );
    });

    it(`${domain}: hu and en have the same number of questions per day`, () => {
      const hu = getTrack(domain, 'hu').days.map((d) => d.quiz.length);
      const en = getTrack(domain, 'en').days.map((d) => d.quiz.length);
      expect(hu).toEqual(en);
    });

    it(`${domain}: hu and en agree on which days have a lab`, () => {
      const hu = getTrack(domain, 'hu').days.map((d) => !!d.lab);
      const en = getTrack(domain, 'en').days.map((d) => !!d.lab);
      expect(hu).toEqual(en);
    });

    it(`${domain}: no two days teach the same topic`, () => {
      for (const locale of LOCALES) {
        const titles = getTrack(domain, locale).days.map((d) => d.title);
        expect(titles, `${domain}/${locale}`).toEqual([...new Set(titles)]);
      }
    });

    it(`${domain}: each written day carries its planned title`, () => {
      for (const locale of LOCALES) {
        const track = getTrack(domain, locale);
        for (const d of track.days) {
          expect(d.title, `${domain}/${locale} day ${d.day}`).toBe(track.plannedTitles[d.day - 1]);
        }
      }
    });

    it(`${domain}: the planned 30-day arc is titled in both locales`, () => {
      for (const locale of LOCALES) {
        const track = getTrack(domain, locale);
        expect(track.plannedTitles, `${domain}/${locale}`).toHaveLength(TRACK_LENGTH);
        for (const t of track.plannedTitles) expect(t.trim()).not.toBe('');
      }
    });

    for (const locale of LOCALES) {
      const track = getTrack(domain, locale);
      const tag = `${domain}/${locale}`;

      it(`${tag}: day numbers are unique, ascending and start at 1`, () => {
        const days = track.days.map((d) => d.day);
        expect(days, tag).toEqual([...new Set(days)]);
        expect(days, tag).toEqual([...days].sort((a, b) => a - b));
        expect(days[0], tag).toBe(1);
        expect(days[days.length - 1]).toBeLessThanOrEqual(TRACK_LENGTH);
      });

      it(`${tag}: every day has a lesson, a note and a quiz`, () => {
        for (const d of track.days) {
          expect(d.lesson.length, `${tag} day ${d.day} lesson`).toBeGreaterThan(0);
          expect(d.quiz.length, `${tag} day ${d.day} quiz`).toBeGreaterThanOrEqual(3);
          expect(d.note.summary.length, `${tag} day ${d.day} note summary`).toBeGreaterThanOrEqual(3);
          expect(d.note.terms.length, `${tag} day ${d.day} note terms`).toBeGreaterThanOrEqual(2);
          expect(d.title.trim(), `${tag} day ${d.day} title`).not.toBe('');
          expect(d.minutes, `${tag} day ${d.day} minutes`).toBeGreaterThan(0);
        }
      });

      it(`${tag}: every question has an explanation and a reachable answer`, () => {
        for (const d of track.days) {
          for (const [i, q] of d.quiz.entries()) {
            const where = `${tag} day ${d.day} q${i}`;
            expect(q.why.trim(), where).not.toBe('');
            expect(q.q.trim(), where).not.toBe('');
            if (q.k === 'single' || q.k === 'output') {
              expect(q.opts[q.answer], where).toBeDefined();
              expect(q.opts.length, where).toBeGreaterThanOrEqual(2);
            }
            if (q.k === 'multi') {
              expect(q.answers.length, where).toBeGreaterThan(0);
              for (const a of q.answers) expect(q.opts[a], where).toBeDefined();
            }
            if (q.k === 'numeric') expect(q.tol, where).toBeGreaterThan(0);
            if (q.k === 'order') {
              expect([...q.correct].sort((x, y) => x - y), where).toEqual(q.items.map((_, n) => n));
            }
          }
        }
      });

      it(`${tag}: every sim, scene and lab reference exists`, () => {
        for (const d of track.days) {
          for (const b of d.lesson) {
            if (b.k === 'sim') expect(SIM_IDS, `${tag} day ${d.day}`).toContain(b.sim);
            if (b.k === 'robot') expect(SCENE_IDS, `${tag} day ${d.day}`).toContain(b.scene);
          }
          if (d.lab?.scene) expect(SCENE_IDS, `${tag} day ${d.day} lab`).toContain(d.lab.scene);
        }
      });

      it(`${tag}: every lab task has a brief, a check and a hint`, () => {
        for (const d of track.days) {
          if (!d.lab) continue;
          const where = `${tag} day ${d.day} lab`;
          expect(d.lab.brief.trim(), where).not.toBe('');
          expect(d.lab.checks.length, where).toBeGreaterThan(0);
          expect(d.lab.hints.length, where).toBeGreaterThan(0);
          for (const c of d.lab.checks) expect(c.label.trim(), where).not.toBe('');
        }
      });
    }
  }
});
