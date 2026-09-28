import { useMemo, useState } from 'react';
import { useStore } from '../../app/store';
import { ALL_DOMAINS, type Domain } from '../../content';
import { searchNotes } from '../../engine/notebook';
import { useT } from '../../i18n';
import { Badge, Button, Icon, Panel } from '../../ui';
import { NoteCard } from './NoteCard';
import { saveTextFile } from './exporter';

export function NotebookPage() {
  const t = useT();
  const notes = useStore((s) => s.state.notes);
  const notesMarkdown = useStore((s) => s.notesMarkdown);

  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState<Domain | null>(null);
  const [onlyWatchOut, setOnlyWatchOut] = useState(false);
  const [exported, setExported] = useState<string | null>(null);

  const filter = useMemo(
    () => ({ domain: domain ?? undefined, onlyWatchOut: onlyWatchOut || undefined }),
    [domain, onlyWatchOut],
  );
  const visible = useMemo(() => searchNotes(notes, query, filter), [notes, query, filter]);

  const doExport = async () => {
    const md = notesMarkdown(filter, query);
    const name = domain ? `forge-${domain}.md` : 'forge-jegyzetek.md';
    const where = await saveTextFile(name, md);
    if (where) setExported(where);
  };

  if (notes.length === 0) {
    return (
      <div className="page">
        <h1>{t('note.title')}</h1>
        <Panel>
          <p className="dim">{t('note.empty')}</p>
        </Panel>
      </div>
    );
  }

  return (
    <div className="page notebook">
      <header className="nbhead">
        <h1>{t('note.title')}</h1>
        <div className="row gap">
          <Button onClick={doExport}>
            <Icon name="notebook" size={16} /> {t('note.export')}
          </Button>
          <Button variant="quiet" onClick={() => window.print()}>
            {t('note.print')}
          </Button>
        </div>
      </header>

      {exported && <p className="dim">{t('note.exported', { path: exported })}</p>}

      <div className="nbfilters no-print">
        <input
          type="search"
          role="searchbox"
          className="searchbox"
          aria-label={t('note.search')}
          placeholder={t('note.search')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="chips">
          <button type="button" className="chip" aria-pressed={domain === null} onClick={() => setDomain(null)}>
            {t('note.all')}
          </button>
          {ALL_DOMAINS.map((d) => (
            <button key={d} type="button" className="chip" aria-pressed={domain === d} onClick={() => setDomain(d)}>
              {t(`domain.${d}`)}
            </button>
          ))}
        </div>

        <label className="togglerow">
          <input type="checkbox" checked={onlyWatchOut} onChange={(e) => setOnlyWatchOut(e.target.checked)} />
          <span>{t('note.onlyWatchOut')}</span>
        </label>

        <Badge tone="muted">{t('note.count', { n: visible.length })}</Badge>
      </div>

      {visible.length === 0 ? (
        <Panel>
          <p className="dim">{t('note.noMatch')}</p>
        </Panel>
      ) : (
        <div className="notelist">
          {visible.map((n) => (
            <NoteCard key={n.id} note={n} />
          ))}
        </div>
      )}
    </div>
  );
}
