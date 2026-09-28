import { useState } from 'react';
import type { SimId } from '../../content/types';
import { useT } from '../../i18n';
import { Panel } from '../../ui';
import { SimCanvas } from './SimCanvas';
import { SIM_IDS } from './sims';

export function PhysicsLabPage() {
  const t = useT();
  const [sim, setSim] = useState<SimId>('projectile');

  return (
    <div className="page wide">
      <h1>{t('phys.title')}</h1>

      <div className="chips">
        {SIM_IDS.map((id) => (
          <button key={id} type="button" className="chip" aria-pressed={sim === id} onClick={() => setSim(id)}>
            {t(`phys.sim.${id}`)}
          </button>
        ))}
      </div>

      <Panel>
        <SimCanvas key={sim} sim={sim} />
      </Panel>
    </div>
  );
}
