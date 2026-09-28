import type { Locale } from '../engine/types';
import { codeEn } from './en/tracks/code';
import { cadEn } from './en/tracks/cad';
import { physicsEn } from './en/tracks/physics';
import { roboticsEn } from './en/tracks/robotics';
import { codeHu } from './hu/tracks/code';
import { cadHu } from './hu/tracks/cad';
import { physicsHu } from './hu/tracks/physics';
import { roboticsHu } from './hu/tracks/robotics';
import { ALL_DOMAINS, TRACK_LENGTH, type Day, type Domain, type Track } from './types';

export { ALL_DOMAINS, TRACK_LENGTH };
export type { Day, Domain, Track };

// Statically imported rather than loaded on demand, so the content validation
// test sees every track and a missing day fails the build instead of the app.
const TRACKS: Record<Locale, Record<Domain, Track>> = {
  hu: { code: codeHu, robotics: roboticsHu, physics: physicsHu, cad: cadHu },
  en: { code: codeEn, robotics: roboticsEn, physics: physicsEn, cad: cadEn },
};

export function getTrack(domain: Domain, locale: Locale): Track {
  return TRACKS[locale][domain];
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
