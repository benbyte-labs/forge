import { useStore } from '../../app/store';
import { BADGES, REWARDS, hasReward } from '../../engine/rewards';
import { useT } from '../../i18n';
import { Badge, Button, Icon, Panel } from '../../ui';
import type { ThemeId } from '../../engine/types';

export function RewardsPage() {
  const t = useT();
  const state = useStore((s) => s.state);
  const setTheme = useStore((s) => s.setTheme);
  const setRobotSkin = useStore((s) => s.setRobotSkin);

  const streak = state.streak.current;

  return (
    <div className="page">
      <h1>{t('reward.title')}</h1>
      <p className="dim">{t('reward.intro')}</p>

      <div className="grid-3">
        {REWARDS.map((r) => {
          const owned = hasReward(state, r.id);
          return (
            <Panel key={r.id} tone={owned ? 'accent' : 'default'} className={owned ? '' : 'locked'}>
              <div className="rewardhead">
                <Icon name={owned ? 'reward' : 'lock'} size={20} />
                <Badge tone={owned ? 'accent' : 'muted'}>{t('reward.atDay', { n: r.at })}</Badge>
              </div>
              <h3>{t(r.nameKey)}</h3>
              <p className="dim">{t(r.descKey)}</p>
              {owned ? (
                r.kind === 'theme' && r.grants ? (
                  <Button onClick={() => setTheme(r.grants as ThemeId)}>
                    {state.theme === r.grants ? t('reward.applied') : t('reward.apply')}
                  </Button>
                ) : r.kind === 'skin' && r.grants ? (
                  <Button onClick={() => setRobotSkin(r.grants as string)}>
                    {state.robotSkin === r.grants ? t('reward.applied') : t('reward.apply')}
                  </Button>
                ) : (
                  <Badge tone="ok">{t('reward.unlocked')}</Badge>
                )
              ) : (
                <Badge tone="muted">{t('reward.locked', { n: Math.max(0, r.at - streak) })}</Badge>
              )}
            </Panel>
          );
        })}
      </div>

      <h2>{t('nav.rewards')}</h2>
      <div className="row gap wrap">
        {BADGES.map((b) => (
          <Badge key={b.id} tone={hasReward(state, b.id) ? 'ok' : 'muted'}>
            {hasReward(state, b.id) ? '★' : '☆'} {b.id.replace('badge-', '')}
          </Badge>
        ))}
      </div>
    </div>
  );
}
