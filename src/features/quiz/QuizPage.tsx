import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../../app/store';
import { ALL_DOMAINS, getDay, type Domain } from '../../content';
import { gradeOne, gradeQuiz, type Answer } from '../../engine/quiz';
import { quizXp } from '../../engine/progress';
import { useT } from '../../i18n';
import { Badge, Button, Icon, Meter, Panel } from '../../ui';
import { QuestionCard, Verdict } from './QuestionCard';

type Phase = 'answering' | 'checked' | 'done';

export function QuizPage() {
  const t = useT();
  const params = useParams();
  const domain = (ALL_DOMAINS as string[]).includes(params.domain ?? '') ? (params.domain as Domain) : null;
  const day = Number(params.day);

  const locale = useStore((s) => s.state.locale);
  const submitQuiz = useStore((s) => s.submitQuiz);

  const content = domain && Number.isInteger(day) ? getDay(domain, locale, day) : undefined;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [phase, setPhase] = useState<Phase>('answering');

  const questions = content?.quiz ?? [];
  const current = questions[index];
  const answer = answers[index] ?? null;

  const result = useMemo(() => gradeQuiz(questions, answers), [questions, answers]);

  if (!domain || !content) {
    return (
      <div className="page">
        <Panel tone="warn" title={t('quiz.title')}>
          <p>{t('lesson.notWritten')}</p>
          <Link className="btn" to={domain ? `/track/${domain}` : '/tracks'}>
            {t('lesson.back')}
          </Link>
        </Panel>
      </div>
    );
  }

  const answered = answer !== null && !(Array.isArray(answer) && answer.length === 0);

  const check = () => setPhase('checked');

  const next = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setPhase('answering');
      return;
    }
    submitQuiz(domain, day, answers);
    setPhase('done');
  };

  const retry = () => {
    setAnswers([]);
    setIndex(0);
    setPhase('answering');
  };

  if (phase === 'done') {
    return (
      <div className="page quiz">
        <h1>{t('quiz.result')}</h1>

        <Panel tone={result.passed ? 'accent' : 'warn'}>
          <div className="resulthead">
            <strong className="resultscore">{t('quiz.score', { correct: result.correct, total: result.total })}</strong>
            <Badge tone={result.passed ? 'ok' : 'warn'}>{result.passed ? t('quiz.passed') : t('quiz.retry')}</Badge>
          </div>
          <Meter value={result.correct} max={result.total} label={t('quiz.result')} tone={result.passed ? 'ok' : 'warn'} />
          {result.passed && <p className="mt">{t('quiz.xpEarned', { n: quizXp(result.accuracy) })}</p>}
          {!result.passed && <p className="mt">{t('quiz.failed')}</p>}
          {result.wrongIndexes.length > 0 && <p className="dim">{t('quiz.toReview', { n: result.wrongIndexes.length })}</p>}
        </Panel>

        <Panel tone="accent" title={t('note.title')}>
          <p>
            <Icon name="notebook" size={16} /> {t('note.saved')}
          </p>
          <div className="row gap mt">
            <Link className="btn" data-variant="primary" to="/notebook">
              {t('note.open')}
            </Link>
            <Button onClick={retry}>{t('quiz.retry')}</Button>
            <Link className="btn" to={`/track/${domain}`}>
              {t('lesson.back')}
            </Link>
          </div>
        </Panel>
      </div>
    );
  }

  const isCorrect = phase === 'checked' && gradeOne(current, answer);

  return (
    <div className="page quiz">
      <header className="quizhead">
        <Link className="btn" data-variant="quiet" to={`/track/${domain}/${day}`}>
          <Icon name="track" size={16} /> {t('lesson.back')}
        </Link>
        <span className="dim">{t('quiz.question', { n: index + 1, total: questions.length })}</span>
      </header>

      <div className="dots" aria-hidden="true">
        {questions.map((_, i) => (
          <span key={i} className="dot" data-state={i === index ? 'now' : i < index ? 'past' : 'future'} />
        ))}
      </div>

      <Panel>
        <QuestionCard question={current} answer={answer} locked={phase === 'checked'} onAnswer={(a) => {
          const next = [...answers];
          next[index] = a;
          setAnswers(next);
        }} />

        {phase === 'checked' && <Verdict correct={isCorrect} why={current.why} />}

        <footer className="quizfoot">
          {phase === 'answering' ? (
            <Button variant="primary" disabled={!answered} onClick={check}>
              {t('quiz.check')}
            </Button>
          ) : (
            <Button variant="primary" onClick={next}>
              {index + 1 < questions.length ? t('quiz.next') : t('quiz.finish')}
            </Button>
          )}
        </footer>
      </Panel>
    </div>
  );
}
