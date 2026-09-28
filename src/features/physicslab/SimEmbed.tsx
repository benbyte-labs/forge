import type { SimId } from '../../content/types';
import { useT } from '../../i18n';
import { Panel } from '../../ui';

interface SimEmbedProps {
  sim: SimId;
  params?: Record<string, number>;
}

/** A simulation embedded in a lesson. Filled in by the Physics Lab task. */
export function SimEmbed({ sim }: SimEmbedProps) {
  const t = useT();
  return (
    <Panel tone="accent" title={t(`phys.sim.${sim}`)}>
      <p className="dim">{t('common.loading')}</p>
    </Panel>
  );
}
