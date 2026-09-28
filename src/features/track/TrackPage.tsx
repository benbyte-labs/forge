import { useT } from '../../i18n';
import { Panel } from '../../ui';

export function TrackPage() {
  const t = useT();
  return (
    <div className="page">
      <h1>{t('track.title')}</h1>
      <Panel>
        <p className="dim">{t('common.loading')}</p>
      </Panel>
    </div>
  );
}
