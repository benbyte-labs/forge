import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../app/store';
import { ALL_DOMAINS, getDay, type Domain } from '../../content';
import { dayKey } from '../../engine/progress';
import { useT } from '../../i18n';
import { Badge, Button, Icon, Panel } from '../../ui';
import { BlockRenderer } from './BlockRenderer';
import { LabTaskPanel } from '../codelab/LabTaskPanel';

export function LessonPage() {
  const t = useT();
  const navigate = useNavigate();
  const params = useParams();

  const domain = (ALL_DOMAINS as string[]).includes(params.domain ?? '') ? (params.domain as Domain) : null;
  const day = Number(params.day);

  const locale = useStore((s) => s.state.locale);
  const progress = useStore((s) => s.state.days[domain ? dayKey(domain, day) : '']);
  const completeLesson = useStore((s) => s.completeLesson);

  if (!domain || !Number.isInteger(day)) {
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

  const content = getDay(domain, locale, day);

  if (!content) {
    return (
      <div className="page">
        <Panel tone="warn" title={t('track.day', { n: day })}>
          <p>{t('lesson.notWritten')}</p>
          <Link className="btn" to={`/track/${domain}`}>
            {t('lesson.back')}
          </Link>
        </Panel>
      </div>
    );
  }

  const done = !!progress?.lessonDone;

  return (
    <article className="page lesson">
      <header className="lessonhead">
        <Link className="btn" data-variant="quiet" to={`/track/${domain}`}>
          <Icon name="track" size={16} /> {t('lesson.back')}
        </Link>
        <div className="lessonhead__meta">
          <Badge tone="muted">{t(`domain.${domain}`)}</Badge>
          <Badge tone="muted">{t('track.day', { n: day })}</Badge>
          <Badge tone="muted">{t('track.minutes', { n: content.minutes })}</Badge>
          {done && <Badge tone="ok">{t('lesson.done')}</Badge>}
        </div>
      </header>

      <h1>{content.title}</h1>

      <div className="lessonbody">
        {content.lesson.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </div>

      {content.lab && <LabTaskPanel domain={domain} day={day} task={content.lab} />}

      <footer className="lessonfoot">
        {!done && (
          <Button variant="ghost" onClick={() => completeLesson(domain, day)}>
            <Icon name="check" size={16} /> {t('lesson.markDone')}
          </Button>
        )}
        <Button
          variant="primary"
          onClick={() => {
            if (!done) completeLesson(domain, day);
            navigate(`/track/${domain}/${day}/quiz`);
          }}
        >
          {t('lesson.toQuiz')} →
        </Button>
      </footer>
    </article>
  );
}
