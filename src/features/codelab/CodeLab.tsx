import { useCallback, useEffect, useState } from 'react';
import { useStore } from '../../app/store';
import type { Check, CodeLang } from '../../content/types';
import { useT } from '../../i18n';
import { Badge, Button, Icon, Panel } from '../../ui';
import { Editor } from './Editor';
import { runChecks, type CheckOutcome } from './checks';
import { runCode } from './runners';
import type { RunResult } from './runners/types';

interface CodeLabProps {
  /** Where the draft is saved. A day key for a task, or a free-play id. */
  draftKey: string;
  lang: CodeLang;
  starter?: string;
  checks?: Check[];
  onSolved?(): void;
  showLangSwitch?: boolean;
}

export function CodeLab({ draftKey, lang: initialLang, starter = '', checks, onSolved, showLangSwitch }: CodeLabProps) {
  const t = useT();
  const drafts = useStore((s) => s.state.codeDrafts);
  const saveDraft = useStore((s) => s.saveDraft);

  const [lang, setLang] = useState<CodeLang>(initialLang);
  const [code, setCode] = useState(drafts[draftKey] ?? starter);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);
  const [outcome, setOutcome] = useState<CheckOutcome | null>(null);

  // Persist the draft, but not on every keystroke.
  useEffect(() => {
    const id = setTimeout(() => saveDraft(draftKey, code), 600);
    return () => clearTimeout(id);
  }, [code, draftKey, saveDraft]);

  const run = useCallback(async () => {
    setRunning(true);
    setOutcome(null);
    try {
      if (checks && checks.length > 0) {
        const o = await runChecks(code, checks, (s) => runCode(lang, s));
        setOutcome(o);
        setResult({ logs: o.logs, error: o.error, timedOut: o.timedOut });
        if (o.passed) onSolved?.();
      } else {
        setResult(await runCode(lang, code));
      }
    } finally {
      setRunning(false);
    }
  }, [code, lang, checks, onSolved]);

  return (
    <div className="codelab">
      <div className="codelab__bar">
        <Button variant="primary" onClick={run} loading={running}>
          <Icon name="play" size={16} /> {running ? t('lab.running') : t('lab.run')}
        </Button>
        <span className="dim small">Ctrl+Enter</span>

        {showLangSwitch && (
          <div className="chips">
            {(['py', 'js'] as const).map((l) => (
              <button key={l} type="button" className="chip" aria-pressed={lang === l} onClick={() => setLang(l)}>
                {l === 'py' ? 'Python' : 'JavaScript'}
              </button>
            ))}
          </div>
        )}

        <span className="codelab__spacer" />

        <Button variant="quiet" onClick={() => setCode(starter)}>
          {t('lab.reset')}
        </Button>
      </div>

      <div className="codelab__split">
        <Editor value={code} lang={lang} onChange={setCode} onRun={run} />

        <div className="console" aria-live="polite">
          <div className="console__head">{t('lab.output')}</div>
          <pre className="console__body">
            {result === null
              ? ''
              : result.timedOut
                ? t('lab.timedOut')
                : result.error
                  ? result.error
                  : result.logs.length
                    ? result.logs.join('\n')
                    : t('lab.emptyOutput')}
          </pre>
        </div>
      </div>

      {outcome && (
        <Panel tone={outcome.passed ? 'accent' : 'warn'}>
          {outcome.passed ? (
            <strong className="ok">
              <Icon name="check" size={16} /> {t('lab.passed')}
            </strong>
          ) : (
            <>
              <strong className="warn">{t('lab.failed')}</strong>
              <ul className="failures">
                {outcome.failures.map((f) => (
                  <li key={f}>
                    <Badge tone="warn">×</Badge> {f}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Panel>
      )}
    </div>
  );
}
