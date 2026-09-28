import { Link, useParams } from 'react-router-dom';
import { useStore } from '../../app/store';
import { ALL_DOMAINS, TRACK_LENGTH, getTrack, type Domain } from '../../content';
import { dayKey, isDayComplete } from '../../engine/progress';
import { useT } from '../../i18n';
import { Badge, Icon, Meter, Panel } from '../../ui';

type NodeState = 'done' | 'available' | 'locked' | 'soon';

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

  const stateOf = (day: number): NodeState => {
    if (day > written) return 'soon';
    if (isDayComplete(days[dayKey(domain, day)])) return 'done';
    if (day === 1 || isDayComplete(days[dayKey(domain, day - 1)])) return 'available';
    return 'locked';
  };

  const titleOf = (day: number) =>
    track.days.find((d) => d.day === day)?.title ?? track.plannedTitles[day - 1] ?? '';

  return (
    <div className="page">
      <header className="trackhead">
        <div>
          <h1>{t(`domain.${domain}`)}</h1>
          <p className="dim">{t(`domain.${domain}.blurb`)}</p>
        </div>
        <div className="trackhead__meter">
          <Meter value={p.done} max={p.total} label={t(`domain.${domain}`)} showText />
          <span className="dim">{t('track.progress', { done: p.done, total: p.total })}</span>
        </div>
      </header>

      <ol className="spine">
        {Array.from({ length: TRACK_LENGTH }, (_, i) => i + 1).map((day) => {
          const st = stateOf(day);
          const title = titleOf(day);
          const minutes = track.days.find((d) => d.day === day)?.minutes;

          const body = (
            <>
              <span className="spine__dot" data-state={st}>
                {st === 'done' ? (
                  <Icon name="check" size={16} />
                ) : st === 'locked' || st === 'soon' ? (
                  <Icon name="lock" size={14} />
                ) : (
                  day
                )}
              </span>
              <span className="spine__text">
                <strong>
                  {t('track.day', { n: day })} — {title}
                </strong>
                <span className="dim">
                  {st === 'soon'
                    ? t('track.soon')
                    : st === 'locked'
                      ? t('track.locked')
                      : minutes
                        ? t('track.minutes', { n: minutes })
                        : ''}
                </span>
              </span>
              {st === 'done' && <Badge tone="ok">{t('track.done')}</Badge>}
              {st === 'available' && <Badge tone="accent">{t('track.available')}</Badge>}
            </>
          );

          return (
            <li key={day} className="spine__row" data-state={st}>
              {st === 'done' || st === 'available' ? (
                <Link className="spine__link" to={`/track/${domain}/${day}`}>
                  {body}
                </Link>
              ) : (
                <div className="spine__link" aria-disabled="true">
                  {body}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
