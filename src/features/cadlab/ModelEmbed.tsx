import { Link } from 'react-router-dom';
import { useT } from '../../i18n';
import { Panel } from '../../ui';

/** A lesson pointing at a model: the viewer itself lives in the CAD Lab. */
export function ModelEmbed({ src }: { src: string }) {
  const t = useT();
  return (
    <Panel tone="accent" title={t('cad.viewer')}>
      <p className="dim mono">{src}</p>
      <Link className="btn" to="/lab/cad">
        {t('cad.openFile')}
      </Link>
    </Panel>
  );
}
