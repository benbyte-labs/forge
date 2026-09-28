import { useState } from 'react';
import type { Domain, LabTask } from '../../content/types';
import { useT } from '../../i18n';
import { Badge, Button, Markdown, Panel } from '../../ui';

interface LabTaskPanelProps {
  domain: Domain;
  day: number;
  task: LabTask;
}

/** The task brief with progressive hints. The runner arrives with the Code Lab. */
export function LabTaskPanel({ task }: LabTaskPanelProps) {
  const t = useT();
  const [shown, setShown] = useState(0);

  return (
    <Panel tone="accent" title={t('lab.brief')} actions={<Badge tone="accent">{task.lab}</Badge>}>
      <Markdown md={task.brief} />

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
        <Button onClick={() => setShown((n) => Math.min(n + 1, task.hints.length))} disabled={shown >= task.hints.length}>
          {shown >= task.hints.length ? t('lab.noMoreHints') : t('lab.hint')}
        </Button>
      </div>
    </Panel>
  );
}
