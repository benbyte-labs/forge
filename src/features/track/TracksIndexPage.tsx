import { Link } from 'react-router-dom';
import { useStore } from '../../app/store';
import { ALL_DOMAINS } from '../../content';
import { useT } from '../../i18n';
import { Badge, Meter, Panel } from '../../ui';

export function TracksIndexPage() {
  const t = useT();
  const trackProgress = useStore((s) => s.trackProgress);
  const setActiveTrack = useStore((s) => s.setActiveTrack);
  const active = useStore((s) => s.state.activeTrack);

  return (
    <div className="page">
      <h1>{t('track.title')}</h1>
      <div className="grid-2">
        {ALL_DOMAINS.map((d) => {
          const p = trackProgress(d);
          return (
            <Panel
              key={d}
              tone={active === d ? 'accent' : 'default'}
              title={t(`domain.${d}`)}
              actions={<Badge tone={active === d ? 'accent' : 'muted'}>{t('track.progress', { done: p.done, total: p.total })}</Badge>}
            >
              <p className="dim">{t(`domain.${d}.blurb`)}</p>
              <Meter value={p.done} max={p.total} label={t(`domain.${d}`)} />
              <div className="row gap mt">
                <Link className="btn" data-variant="primary" to={`/track/${d}`} onClick={() => setActiveTrack(d)}>
                  {t('track.open')}
                </Link>
                {p.written < p.total && <Badge tone="muted">{t('track.soon')}: {p.total - p.written}</Badge>}
              </div>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}
