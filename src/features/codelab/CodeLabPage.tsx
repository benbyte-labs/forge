import { useT } from '../../i18n';
import { Panel } from '../../ui';
import { CodeLab } from './CodeLab';

const STARTER = `# Írj ide bármit, és nyomj Ctrl+Enter-t.
# Write anything here and press Ctrl+Enter.

for i in range(5):
    print("FORGE", i)
`;

export function CodeLabPage() {
  const t = useT();
  return (
    <div className="page">
      <h1>{t('nav.codelab')}</h1>
      <Panel>
        <CodeLab draftKey="freeplay" lang="py" starter={STARTER} showLangSwitch />
      </Panel>
    </div>
  );
}
