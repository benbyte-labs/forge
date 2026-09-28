import { useState } from 'react';
import { useStore } from '../../app/store';
import type { Domain, LabTask } from '../../content/types';
import { dayKey } from '../../engine/progress';
import { useT } from '../../i18n';
import { Badge, Button, Markdown, Panel } from '../../ui';
import { CodeLab } from './CodeLab';

interface LabTaskPanelProps {
  domain: Domain;
  day: number;
  task: LabTask;
}

export function LabTaskPanel({ domain, day, task }: LabTaskPanelProps) {
  const t = useT();
  const [shown, setShown] = useState(0);
  const completeLab = useStore((s) => s.completeLab);
  const done = useStore((s) => !!s.state.days[dayKey(domain, day)]?.labDone);

  return (
    <Panel
      tone="accent"
      title={t('lab.brief')}
      actions={done ? <Badge tone="ok">{t('track.done')}</Badge> : <Badge tone="accent">{task.lab}</Badge>}
    >
      <Markdown md={task.brief} />

      {task.lab === 'code' && (
        <CodeLab
          draftKey={dayKey(domain, day)}
          lang={task.lang ?? 'py'}
          starter={task.starter}
          checks={task.checks}
          onSolved={() => completeLab(domain, day)}
        />
      )}

      {shown > 0 && (
        <ol className="hints">
          {task.hints.slice(0, shown).map((h, i) => (
            <li key={i}>
              <strong>{t('lab.hintN', { n: i + 1 })}</strong> {h}
            </li>
          ))}
        </ol>
      )}

      <div className="row gap mt">
        <Button
          onClick={() => setShown((n) => Math.min(n + 1, task.hints.length))}
          disabled={shown >= task.hints.length}
        >
          {shown >= task.hints.length ? t('lab.noMoreHints') : t('lab.hint')}
        </Button>
      </div>
    </Panel>
  );
}
