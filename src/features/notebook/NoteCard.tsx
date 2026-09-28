import { useEffect, useState } from 'react';
import { useStore } from '../../app/store';
import type { StoredNote } from '../../engine/types';
import { useT } from '../../i18n';
import { Badge, Formula, Icon, Markdown, Panel } from '../../ui';

export function NoteCard({ note }: { note: StoredNote }) {
  const t = useT();
  const saveUserNote = useStore((s) => s.saveUserNote);
  const [draft, setDraft] = useState(note.userNote);

  // Keep the box in step when the note is rebuilt by a quiz retake.
  useEffect(() => setDraft(note.userNote), [note.userNote]);

  return (
    <Panel
      as="article"
      className="notecard"
      title={`${t('track.day', { n: note.day })} — ${note.title}`}
      actions={<Badge tone="muted">{t(`domain.${note.domain}`)}</Badge>}
    >
      <ul className="notesummary">
        {note.summary.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>

      {note.terms.length > 0 && (
        <>
          <h3 className="notesection">{t('note.terms')}</h3>
          <dl className="terms">
            {note.terms.map((term) => (
              <div className="terms__row" key={term.term}>
                <dt>{term.term}</dt>
                <dd>{term.def}</dd>
              </div>
            ))}
          </dl>
        </>
      )}

      {note.formulas && note.formulas.length > 0 && (
        <>
          <h3 className="notesection">{t('note.formulas')}</h3>
          <ul className="noteformulas">
            {note.formulas.map((f) => (
              <li key={f.tex}>
                <Formula tex={f.tex} display={false} />
                <span className="dim"> — {f.meaning}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {note.watchOut.length > 0 && (
        <aside className="watchout" role="note">
          <strong>
            <Icon name="flame" size={16} /> {t('note.watchOut')}
          </strong>
          <p className="dim">{t('note.watchOutBrief')}</p>
          <ul>
            {note.watchOut.map((w, i) => (
              <li key={i}>
                <Markdown md={w} />
              </li>
            ))}
          </ul>
        </aside>
      )}

      <label className="usernote">
        <span className="notesection">{t('note.myNote')}</span>
        <textarea
          aria-label={t('note.myNote')}
          placeholder={t('note.myNotePlaceholder')}
          value={draft}
          rows={2}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => saveUserNote(note.id, draft)}
        />
      </label>
    </Panel>
  );
}
