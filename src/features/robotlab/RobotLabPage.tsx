import { useT } from '../../i18n';
import { Panel } from '../../ui';
import { RobotLab } from './RobotLab';

export function RobotLabPage() {
  const t = useT();
  return (
    <div className="page wide">
      <h1>{t('robot.title')}</h1>
      <Panel>
        <RobotLab scene="obstacle" />
      </Panel>
    </div>
  );
}
