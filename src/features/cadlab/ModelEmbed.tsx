import { useT } from '../../i18n';
import { Panel } from '../../ui';

/** A 3D model embedded in a lesson. Filled in by the CAD Lab task. */
export function ModelEmbed({ src }: { src: string }) {
  const t = useT();
  return (
    <Panel tone="accent" title={t('cad.viewer')}>
      <p className="dim mono">{src}</p>
    </Panel>
  );
}
