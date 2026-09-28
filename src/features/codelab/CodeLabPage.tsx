import { useT } from '../../i18n';
import { Panel } from '../../ui';

export function CodeLabPage() {
  const t = useT();
  return (
    <div className="page">
      <h1>{t('nav.codelab')}</h1>
      <Panel>
        <p className="dim">{t('common.loading')}</p>
      </Panel>
    </div>
  );
}
