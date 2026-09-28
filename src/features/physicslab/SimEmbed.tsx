import type { SimId } from '../../content/types';
import { useT } from '../../i18n';
import { Panel } from '../../ui';
import { SimCanvas } from './SimCanvas';

/** A simulation embedded straight into a lesson. */
export function SimEmbed({ sim, params }: { sim: SimId; params?: Record<string, number> }) {
  const t = useT();
  return (
    <Panel tone="accent" title={t(`phys.sim.${sim}`)}>
      <SimCanvas sim={sim} overrides={params} compact />
    </Panel>
  );
}
