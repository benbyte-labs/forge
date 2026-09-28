import { useState } from 'react';
import { useStore } from '../../app/store';
import { availableThemes } from '../../engine/rewards';
import type { Locale, ThemeId } from '../../engine/types';
import { LOCALE_NAMES, LOCALES, useT } from '../../i18n';
import { Button, Panel } from '../../ui';
import { saveTextFile } from '../notebook/exporter';

export function SettingsPage() {
  const t = useT();
  const state = useStore((s) => s.state);
  const setLocale = useStore((s) => s.setLocale);
  const setTheme = useStore((s) => s.setTheme);
  const setMotion = useStore((s) => s.setMotion);
  const exportBackup = useStore((s) => s.exportBackup);
  const importBackup = useStore((s) => s.importBackup);
  const resetAll = useStore((s) => s.resetAll);

  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const themes = availableThemes(state) as ThemeId[];

  return (
    <div className="page">
      <h1>{t('settings.title')}</h1>

      <Panel title={t('settings.language')}>
        <div className="chips">
          {LOCALES.map((l: Locale) => (
            <button key={l} type="button" className="chip" aria-pressed={state.locale === l} onClick={() => setLocale(l)}>
              {LOCALE_NAMES[l]}
            </button>
          ))}
        </div>
      </Panel>

      <Panel title={t('settings.theme')}>
        <div className="chips">
          {(['cyan', 'amber', 'void', 'light'] as ThemeId[]).map((th) => {
            const open = themes.includes(th);
            return (
              <button
                key={th}
                type="button"
                className="chip"
                aria-pressed={state.theme === th}
                disabled={!open}
                title={open ? th : t('settings.themeLocked')}
                onClick={() => setTheme(th)}
              >
                {th}
              </button>
            );
          })}
        </div>
      </Panel>

      <Panel title={t('settings.motion')}>
        <label className="togglerow">
          <input type="checkbox" checked={state.motion} onChange={(e) => setMotion(e.target.checked)} />
          <span>{state.motion ? t('settings.motionOn') : t('settings.motionOff')}</span>
        </label>
      </Panel>

      <Panel title={t('settings.backup')}>
        <div className="row gap wrap">
          <Button
            onClick={async () => {
              const where = await saveTextFile('forge-backup.json', exportBackup());
              if (where) setStatus(t('note.exported', { path: where }));
            }}
          >
            {t('settings.exportBackup')}
          </Button>

          <label className="btn">
            {t('settings.importBackup')}
            <input
              type="file"
              accept="application/json,.json"
              style={{ display: 'none' }}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const ok = importBackup(await file.text());
                setStatus(ok ? t('common.ok') : t('common.error'));
              }}
            />
          </label>
        </div>
        {status && <p className="dim mt">{status}</p>}
      </Panel>

      <Panel tone="warn" title={t('settings.reset')}>
        <p className="dim">{t('settings.resetWarn')}</p>
        <div className="row gap mt wrap">
          <input
            className="searchbox"
            aria-label={t('settings.resetConfirm')}
            placeholder={t('settings.resetConfirm')}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <Button
            variant="danger"
            disabled={confirm.trim() !== t('settings.resetWord')}
            onClick={() => {
              resetAll();
              setConfirm('');
            }}
          >
            {t('settings.reset')}
          </Button>
        </div>
      </Panel>
    </div>
  );
}
