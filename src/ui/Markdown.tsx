import { Fragment, type ReactNode } from 'react';

/**
 * A small Markdown renderer for our own authored content.
 *
 * It builds React elements rather than HTML strings, so nothing in the content
 * can inject markup — a full Markdown library would be more capable and also
 * more surface than a few paragraphs of course text need.
 *
 * Supported: paragraphs, `**bold**`, `_italic_`, `` `code` ``, bullet lists,
 * numbered lists, and `[text](url)` links.
 */

const INLINE = /(\*\*[^*]+\*\*|_[^_]+_|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

function inline(text: string, keyPrefix: string): ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={key}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('_') && part.endsWith('_') && part.length > 2) return <em key={key}>{part.slice(1, -1)}</em>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={key}>{part.slice(1, -1)}</code>;
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      return (
        <a key={key} href={link[2]} target="_blank" rel="noreferrer noopener">
          {link[1]}
        </a>
      );
    }
    return <Fragment key={key}>{part}</Fragment>;
  });
}

export function Markdown({ md }: { md: string }) {
  const lines = md.split('\n');
  const out: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let para: string[] = [];

  const flushPara = () => {
    if (para.length === 0) return;
    const text = para.join(' ');
    out.push(<p key={`p${out.length}`}>{inline(text, `p${out.length}`)}</p>);
    para = [];
  };

  const flushList = () => {
    if (!list) return;
    const { ordered, items } = list;
    const Tag = ordered ? 'ol' : 'ul';
    out.push(
      <Tag key={`l${out.length}`}>
        {items.map((item, i) => (
          <li key={i}>{inline(item, `l${out.length}-${i}`)}</li>
        ))}
      </Tag>,
    );
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (line.trim() === '') {
      flushPara();
      flushList();
      continue;
    }

    const bullet = /^\s*[-*]\s+(.*)$/.exec(line);
    const numbered = /^\s*\d+\.\s+(.*)$/.exec(line);

    if (bullet || numbered) {
      flushPara();
      const ordered = !!numbered;
      const item = (bullet ?? numbered)![1];
      if (list && list.ordered !== ordered) flushList();
      if (!list) list = { ordered, items: [] };
      list.items.push(item);
      continue;
    }

    flushList();
    para.push(line.trim());
  }

  flushPara();
  flushList();

  return <div className="md">{out}</div>;
}
