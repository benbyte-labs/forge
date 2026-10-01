import { useNavigate } from 'react-router-dom';
import { useStore } from '../../app/store';
import { TRACK_GROUPS, type Domain } from '../../content';
import { useT } from '../../i18n';
import { Badge, Icon, Meter } from '../../ui';

/** Which icon stands for each course on the picker. */
const ICONS: Record<Domain, string> = {
  code: 'code',
  java: 'code',
  c: 'code',
  cpp: 'code',
  robotics: 'robot',
  physics: 'physics',
  cad: 'cad',
  blender: 'cad',
};

export function TracksIndexPage() {
  const t = useT();
  const navigate = useNavigate();
  const trackProgress = useStore((s) => s.trackProgress);
  const setActiveTrack = useStore((s) => s.setActiveTrack);
  const active = useStore((s) => s.state.activeTrack);

  const open = (d: Domain) => {
    setActiveTrack(d);
    navigate(`/track/${d}`);
  };

  return (
    <div className="page">
      <h1>{t('path.pick')}</h1>

      {TRACK_GROUPS.map((group) => (
        <section className="coursegroup" key={group.key}>
          <h2>{t(group.key)}</h2>
          <div className="grid-2">
            {group.tracks.map((d) => {
              const p = trackProgress(d);
              return (
                <button
                  key={d}
                  type="button"
                  className="coursecard"
                  aria-current={active === d}
                  onClick={() => open(d)}
                >
                  <span className="coursecard__icon">
                    <Icon name={ICONS[d]} size={24} />
                  </span>
                  <span className="coursecard__text">
                    <strong>{t(`domain.${d}`)}</strong>
                    <span>{t(`domain.${d}.blurb`)}</span>
                    <Meter value={p.done} max={p.total} label={t(`domain.${d}`)} />
                  </span>
                  <Badge tone={p.done > 0 ? 'ok' : 'muted'}>
                    {t('path.ofDays', { done: p.done, total: p.total })}
                  </Badge>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
