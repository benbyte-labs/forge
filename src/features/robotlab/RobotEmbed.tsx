import type { SceneId } from '../../content/types';
import { useT } from '../../i18n';
import { Panel } from '../../ui';

/** The 3D robot embedded in a lesson. Filled in by the Robot Lab task. */
export function RobotEmbed({ scene }: { scene: SceneId }) {
  const t = useT();
  return (
    <Panel tone="accent" title={`${t('robot.title')} — ${scene}`}>
      <p className="dim">{t('common.loading')}</p>
    </Panel>
  );
}
