import type { Question } from '../../content/types';
import type { Answer } from '../../engine/quiz';
import { useT } from '../../i18n';
import { Button, CodeBlock, Icon, Markdown } from '../../ui';

interface QuestionCardProps {
  question: Question;
  answer: Answer;
  onAnswer(a: Answer): void;
  locked: boolean;
}

export function QuestionCard({ question: q, answer, onAnswer, locked }: QuestionCardProps) {
  const t = useT();

  switch (q.k) {
    case 'single':
    case 'output':
      return (
        <div className="qbody">
          <Markdown md={q.q} />
          {q.k === 'output' && <CodeBlock src={q.code} lang={q.lang} />}
          <div className="options" role="radiogroup" aria-label={q.q}>
            {q.opts.map((opt, i) => (
              <label key={i} className="option" data-picked={answer === i}>
                <input
                  type="radio"
                  name="answer"
                  checked={answer === i}
                  disabled={locked}
                  onChange={() => onAnswer(i)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      );

    case 'multi': {
      const picked = Array.isArray(answer) ? answer : [];
      const toggle = (i: number) =>
        onAnswer(picked.includes(i) ? picked.filter((x) => x !== i) : [...picked, i]);
      return (
        <div className="qbody">
          <Markdown md={q.q} />
          <p className="dim small">{t('quiz.selectAll')}</p>
          <div className="options">
            {q.opts.map((opt, i) => (
              <label key={i} className="option" data-picked={picked.includes(i)}>
                <input type="checkbox" checked={picked.includes(i)} disabled={locked} onChange={() => toggle(i)} />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }

    case 'numeric':
      return (
        <div className="qbody">
          <Markdown md={q.q} />
          <p className="dim small">{t('quiz.numericHint')}</p>
          <div className="numericrow">
            <input
              className="numinput"
              type="number"
              step="any"
              aria-label={q.q}
              disabled={locked}
              value={typeof answer === 'number' ? answer : ''}
              onChange={(e) => onAnswer(e.target.value === '' ? null : Number(e.target.value))}
            />
            {q.unit && <span className="dim mono">{q.unit}</span>}
          </div>
        </div>
      );

    case 'order': {
      const order = Array.isArray(answer) && answer.length === q.items.length ? answer : q.items.map((_, i) => i);
      const move = (from: number, to: number) => {
        if (to < 0 || to >= order.length) return;
        const next = [...order];
        [next[from], next[to]] = [next[to], next[from]];
        onAnswer(next);
      };
      return (
        <div className="qbody">
          <Markdown md={q.q} />
          <p className="dim small">{t('quiz.orderHint')}</p>
          <ol className="orderlist">
            {order.map((itemIndex, pos) => (
              <li key={itemIndex} className="orderitem">
                <span className="orderitem__n">{pos + 1}</span>
                <span className="orderitem__text">{q.items[itemIndex]}</span>
                <span className="orderitem__btns">
                  <Button variant="quiet" aria-label={t('quiz.moveUp')} disabled={locked || pos === 0} onClick={() => move(pos, pos - 1)}>
                    ↑
                  </Button>
                  <Button
                    variant="quiet"
                    aria-label={t('quiz.moveDown')}
                    disabled={locked || pos === order.length - 1}
                    onClick={() => move(pos, pos + 1)}
                  >
                    ↓
                  </Button>
                </span>
              </li>
            ))}
          </ol>
        </div>
      );
    }
  }
}

export function Verdict({ correct, why }: { correct: boolean; why: string }) {
  const t = useT();
  return (
    <div className="verdict" data-correct={correct}>
      <strong>
        <Icon name={correct ? 'check' : 'lock'} size={16} /> {correct ? t('quiz.correct') : t('quiz.wrong')}
      </strong>
      <p>
        <em>{t('quiz.why')}</em> {why}
      </p>
    </div>
  );
}
