import type { Locale } from '../engine/types';
import { codeEn } from './en/tracks/code';
import { cadEn } from './en/tracks/cad';
import { physicsEn } from './en/tracks/physics';
import { roboticsEn } from './en/tracks/robotics';
import { javaEn } from './en/tracks/java';
import { cEn } from './en/tracks/c';
import { cppEn } from './en/tracks/cpp';
import { blenderEn } from './en/tracks/blender';
import { codeHu } from './hu/tracks/code';
import { cadHu } from './hu/tracks/cad';
import { physicsHu } from './hu/tracks/physics';
import { roboticsHu } from './hu/tracks/robotics';
import { javaHu } from './hu/tracks/java';
import { cHu } from './hu/tracks/c';
import { cppHu } from './hu/tracks/cpp';
import { blenderHu } from './hu/tracks/blender';
import { ALL_DOMAINS, TRACK_GROUPS, TRACK_LENGTH, type Day, type Domain, type Track } from './types';

export { ALL_DOMAINS, TRACK_GROUPS, TRACK_LENGTH };
export type { Day, Domain, Track };

// Statically imported rather than loaded on demand, so the content validation
// test sees every track and a missing day fails the build instead of the app.
const TRACKS: Partial<Record<Locale, Record<Domain, Track>>> = {
  hu: {
    code: codeHu,
    java: javaHu,
    c: cHu,
    cpp: cppHu,
    robotics: roboticsHu,
    physics: physicsHu,
    cad: cadHu,
    blender: blenderHu,
  },
  en: {
    code: codeEn,
    java: javaEn,
    c: cEn,
    cpp: cppEn,
    robotics: roboticsEn,
    physics: physicsEn,
    cad: cadEn,
    blender: blenderEn,
  },
};

/** What a language falls back to when it has no content of its own yet. */
const CONTENT_FALLBACK: Locale = 'en';

/**
 * The track in the requested language, or the English one when that language
 * has no content yet.
 *
 * A language can therefore be added by translating the interface alone: the
 * learner reads the lessons in English rather than facing an empty screen, and
 * translated days simply start appearing as they are written.
 */
export function getTrack(domain: Domain, locale: Locale): Track {
  return (TRACKS[locale] ?? TRACKS[CONTENT_FALLBACK]!)[domain];
}

/** True when this language has lessons of its own. */
export function hasTranslatedContent(locale: Locale): boolean {
  return TRACKS[locale] !== undefined;
}

export function getDay(domain: Domain, locale: Locale, day: number): Day | undefined {
  return getTrack(domain, locale).days.find((d) => d.day === day);
}

/** How many days of this track are actually written. */
export function writtenDays(domain: Domain, locale: Locale): number {
  return getTrack(domain, locale).days.length;
}

/** The title of a day, written or merely planned. */
export function dayTitle(domain: Domain, locale: Locale, day: number): string {
  const track = getTrack(domain, locale);
  return track.days.find((d) => d.day === day)?.title ?? track.plannedTitles[day - 1] ?? '';
}
