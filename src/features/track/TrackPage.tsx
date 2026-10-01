import { Link, useParams } from 'react-router-dom';
import { useStore } from '../../app/store';
import { ALL_DOMAINS, TRACK_LENGTH, getTrack, type Domain } from '../../content';
import { dayKey, isDayComplete } from '../../engine/progress';
import { useT } from '../../i18n';
import { Icon, Meter, Panel } from '../../ui';

type NodeState = 'done' | 'current' | 'available' | 'locked' | 'soon';

/** Days per section, so the path breaks into digestible chunks. */
const UNIT = 5;

export function TrackPage() {
  const t = useT();
  const params = useParams();
  const domain = (ALL_DOMAINS as string[]).includes(params.domain ?? '') ? (params.domain as Domain) : null;

  const locale = useStore((s) => s.state.locale);
  const days = useStore((s) => s.state.days);
  const progress = useStore((s) => s.trackProgress);

  if (!domain) {
    return (
      <div className="page">
        <Panel>
          <p>{t('common.error')}</p>
          <Link className="btn" to="/tracks">
            {t('common.back')}
          </Link>
        </Panel>
      </div>
    );
  }

  const track = getTrack(domain, locale);
  const written = track.days.length;
  const p = progress(domain);

  /** The first unfinished written day — the one the path points at. */
  const currentDay = (() => {
    for (const d of track.days) {
      if (!isDayComplete(days[dayKey(domain, d.day)])) return d.day;
    }
    return null;
  })();

  const stateOf = (day: number): NodeState => {
    if (day > written) return 'soon';
    if (isDayComplete(days[dayKey(domain, day)])) return 'done';
    if (day === currentDay) return 'current';
    if (day === 1 || isDayComplete(days[dayKey(domain, day - 1)])) return 'available';
    return 'locked';
  };

  const titleOf = (day: number) =>
    track.days.find((d) => d.day === day)?.title ?? track.plannedTitles[day - 1] ?? '';

  const allDays = Array.from({ length: TRACK_LENGTH }, (_, i) => i + 1);

  return (
    <div className="page">
      <header className="coursehead">
        <div>
          <h1>{t(`domain.${domain}`)}</h1>
          <p>{t('track.progress', { done: p.done, total: p.total })}</p>
        </div>
        <div className="trackhead__meter">
          <Meter value={p.done} max={p.total} label={t(`domain.${domain}`)} showText />
        </div>
      </header>

      <div className="pathwrap">
        {allDays.map((day) => {
          const st = stateOf(day);
          const open = st === 'done' || st === 'available' || st === 'current';
          const unitStart = (day - 1) % UNIT === 0;
          const unitIndex = Math.floor((day - 1) / UNIT) + 1;

          const inner = (
            <>
              {st === 'current' && <span className="node__ring" aria-hidden="true" />}
              {st === 'done' ? (
                <Icon name="check" size={26} />
              ) : st === 'locked' || st === 'soon' ? (
                <Icon name="lock" size={20} />
              ) : (
                day
              )}
              <span className="node__label">{t('track.day', { n: day })}</span>
            </>
          );

          const label = `${t('track.day', { n: day })} — ${titleOf(day)}`;

          return (
            <div key={day}>
              {unitStart && (
                <div className="unitbar">
                  <strong>{t('path.unit', { n: unitIndex })}</strong>
                  <span>{titleOf(day)}</span>
                </div>
              )}

              <div className="pathrow" data-off={(day - 1) % 8}>
                {open ? (
                  <Link className="node" data-state={st} to={`/track/${domain}/${day}`} aria-label={label} title={label}>
                    {inner}
                  </Link>
                ) : (
                  <span className="node" data-state={st} aria-disabled="true" aria-label={label} title={label}>
                    {inner}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        <p className="pathtitle">
          {written < TRACK_LENGTH ? t('track.soon') : t('path.crown')}
        </p>
      </div>
    </div>
  );
}
