import { Link } from 'react-router-dom';
import { useStore } from '../../app/store';
import { ALL_DOMAINS } from '../../content';
import { today } from '../../engine/dates';
import { countCompletedDays, levelProgress } from '../../engine/progress';
import { useT } from '../../i18n';
import { Badge, Button, Icon, Meter, Panel } from '../../ui';
import { StreakCalendar } from './StreakCalendar';

export function DashboardPage() {
  const t = useT();
  const state = useStore((s) => s.state);
  const mission = useStore((s) => s.todayMission)();
  const due = useStore((s) => s.dueReviews)();
  const setActiveTrack = useStore((s) => s.setActiveTrack);

  const { level, into, span } = levelProgress(state.xp);
  const doneToday = Object.values(state.days).some((d) => d.completedOn === today());

  return (
    <div className="page">
      <h1>{t('dash.title')}</h1>

      {due.length > 0 && (
        <Panel as="article" tone="warn" title={t('dash.review')}>
          <p>{t('dash.reviewBrief', { n: due.length })}</p>
          <Link className="btn" to={`/track/${due[0].domain}/${due[0].day}/quiz`}>
            {t('dash.continue')}
          </Link>
        </Panel>
      )}

      {!state.activeTrack ? (
        <Panel as="article" tone="accent" title={t('dash.today')}>
          <p>{t('dash.pickTrack')}</p>
          <div className="row gap wrap mt">
            {ALL_DOMAINS.map((d) => (
              <Button key={d} variant="ghost" onClick={() => setActiveTrack(d)}>
                {t(`domain.${d}`)}
              </Button>
            ))}
          </div>
        </Panel>
      ) : mission ? (
        <Panel as="article" tone="accent" title={t('dash.today')}>
          <div className="missionhead">
            <div>
              <h2>
                {t('track.day', { n: mission.day })} — {mission.title}
              </h2>
              <p className="dim">
                {t(`domain.${mission.domain}`)} · {t('track.minutes', { n: mission.minutes })}
              </p>
            </div>
            {doneToday && <Badge tone="ok">{t('dash.todayDone')}</Badge>}
          </div>

          <ol className="steps">
            <li data-done={mission.lessonDone}>
              <Icon name={mission.lessonDone ? 'check' : 'notebook'} size={16} /> {t('dash.lesson')}
            </li>
            {mission.hasLab && (
              <li data-done={mission.labDone}>
                <Icon name={mission.labDone ? 'check' : 'code'} size={16} /> {t('dash.lab')}
              </li>
            )}
            <li data-done={mission.quizDone}>
              <Icon name={mission.quizDone ? 'check' : 'track'} size={16} /> {t('dash.quiz')}
            </li>
          </ol>

          <Link className="btn mt" data-variant="primary" to={`/track/${mission.domain}/${mission.day}`}>
            {mission.lessonDone ? t('dash.continue') : t('dash.start')} →
          </Link>
        </Panel>
      ) : (
        <Panel as="article" tone="accent" title={t('dash.today')}>
          <p>{t('dash.todayDone')}</p>
          <Link className="btn" to="/tracks">
            {t('nav.tracks')}
          </Link>
        </Panel>
      )}

      <div className="grid-2">
        <Panel title={t('dash.calendar')}>
          <StreakCalendar />
        </Panel>

        <Panel title={t('dash.stats')}>
          <div className="statgrid">
            <div>
              <span className="dim">{t('dash.totalXp')}</span>
              <strong>{state.xp}</strong>
            </div>
            <div>
              <span className="dim">{t('dash.daysDone')}</span>
              <strong>{countCompletedDays(state)}</strong>
            </div>
            <div>
              <span className="dim">{t('dash.notesCount')}</span>
              <strong>{state.notes.length}</strong>
            </div>
            <div>
              <span className="dim">{t('streak.best', { n: state.streak.best })}</span>
              <strong>{state.streak.current}</strong>
            </div>
          </div>
          <p className="dim mt">{t('dash.level', { n: level })}</p>
          <Meter value={into} max={span} label={t('dash.level', { n: level })} showText />
          {state.streak.freezes > 0 && (
            <p className="dim mt">
              <Icon name="flame" size={14} /> {t('streak.freezes', { n: state.streak.freezes })}
            </p>
          )}
        </Panel>
      </div>
    </div>
  );
}
