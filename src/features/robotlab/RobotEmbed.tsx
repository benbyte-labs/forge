import type { SceneId } from '../../content/types';
import { useT } from '../../i18n';
import { Panel } from '../../ui';
import { RobotLab } from './RobotLab';

/** The 3D robot, embedded straight into a lesson. */
export function RobotEmbed({ scene }: { scene: SceneId }) {
  const t = useT();
  return (
    <Panel tone="accent" title={t('robot.title')}>
      <RobotLab scene={scene} fixedScene compact />
    </Panel>
  );
}
