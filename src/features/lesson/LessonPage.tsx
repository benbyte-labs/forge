import { useEffect, useState } from 'react';
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

      <LessonSteps
        key={`${domain}:${day}`}
        domain={domain}
        day={day}
        content={content}
        onReachEnd={() => {
          if (!done) completeLesson(domain, day);
        }}
        onFinish={() => navigate(`/track/${domain}/${day}/quiz`)}
      />
    </article>
  );
}

/**
 * One lesson block per screen, the way the quiz shows one question per screen.
 * A lesson is five to seven blocks plus an optional lab, which together are far
 * taller than a window; paging them keeps every step readable without scrolling.
 */
function LessonSteps({
  domain,
  day,
  content,
  onReachEnd,
  onFinish,
}: {
  domain: Domain;
  day: number;
  content: NonNullable<ReturnType<typeof getDay>>;
  onReachEnd: () => void;
  onFinish: () => void;
}) {
  const t = useT();
  const [step, setStep] = useState(0);

  // The lab is tall enough to need a screen of its own, so it becomes the
  // last step rather than sitting underneath the final block.
  const total = content.lesson.length + (content.lab ? 1 : 0);
  const onLab = !!content.lab && step === total - 1;
  const atEnd = step === total - 1;

  useEffect(() => {
    if (atEnd) onReachEnd();
  }, [atEnd, onReachEnd]);

  return (
    <>
      <div className="dots" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className="dot" data-state={i === step ? 'now' : i < step ? 'past' : 'future'} />
        ))}
      </div>

      <div className="lessonstep" role="group" aria-label={t('lesson.step', { a: step + 1, b: total })}>
        {onLab ? (
          <LabTaskPanel domain={domain} day={day} task={content.lab!} />
        ) : (
          <BlockRenderer block={content.lesson[step]} />
        )}
      </div>

      <footer className="lessonfoot">
        <span className="lessonfoot__count dim">{t('lesson.step', { a: step + 1, b: total })}</span>
        {step > 0 && (
          <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
            ← {t('lesson.prev')}
          </Button>
        )}
        {atEnd ? (
          <Button variant="primary" onClick={onFinish}>
            {t('lesson.toQuiz')} →
          </Button>
        ) : (
          <Button variant="primary" onClick={() => setStep((s) => s + 1)}>
            {t('lesson.next')} →
          </Button>
        )}
      </footer>
    </>
  );
}
