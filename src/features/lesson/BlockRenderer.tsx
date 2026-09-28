import type { Block } from '../../content/types';
import { useT } from '../../i18n';
import { CodeBlock, Formula, Markdown } from '../../ui';
import { SimEmbed } from '../physicslab/SimEmbed';
import { RobotEmbed } from '../robotlab/RobotEmbed';
import { ModelEmbed } from '../cadlab/ModelEmbed';

const CALLOUT_KEY = { tip: 'lesson.tip', warn: 'lesson.warn', key: 'lesson.key' } as const;

export function BlockRenderer({ block }: { block: Block }) {
  const t = useT();

  switch (block.k) {
    case 'text':
      return <Markdown md={block.md} />;

    case 'code':
      return <CodeBlock src={block.src} lang={block.lang} label={block.explain} />;

    case 'formula':
      return (
        <div className="formulabox">
          <Formula tex={block.tex} />
          <p className="dim">{block.explain}</p>
        </div>
      );

    case 'callout':
      return (
        <aside className="callout" role="note" data-tone={block.tone}>
          <span className="callout__tag">{t(CALLOUT_KEY[block.tone])}</span>
          <Markdown md={block.md} />
        </aside>
      );

    case 'sim':
      return <SimEmbed sim={block.sim} params={block.params} />;

    case 'robot':
      return <RobotEmbed scene={block.scene} />;

    case 'model':
      return <ModelEmbed src={block.src} />;

    default:
      // Unknown block kinds render as nothing. A content bug should not take
      // the whole lesson down — and the content test catches it before release.
      return null;
  }
}
