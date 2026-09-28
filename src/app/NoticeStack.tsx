import { useT } from '../i18n';
import { Button, Icon } from '../ui';
import { useStore, type Notice } from './store';

function noticeText(n: Notice, t: ReturnType<typeof useT>): { title: string; body: string; tone: string } {
  switch (n.kind) {
    case 'recovered':
      return { title: t('common.error'), body: t('common.recovered'), tone: 'warn' };
    case 'freeze':
      return { title: t('nav.rewards'), body: t('streak.frozen'), tone: 'accent' };
    case 'broken':
      return { title: t('nav.dashboard'), body: t('streak.broken', { n: n.after }), tone: 'warn' };
    case 'milestone':
      return { title: t('streak.milestone', { n: n.day }), body: t('reward.intro'), tone: 'accent' };
    case 'reward':
      return { title: t('reward.unlocked'), body: `${t(n.reward.nameKey)} — ${t(n.reward.descKey)}`, tone: 'accent' };
  }
}

/**
 * Notices are stacked rather than replaced: finishing a day can break a streak,
 * hand out a freeze and unlock two rewards at once, and swallowing three of
 * those four would leave the learner wondering what happened.
 */
export function NoticeStack() {
  const t = useT();
  const notices = useStore((s) => s.notices);
  const dismiss = useStore((s) => s.dismissNotice);

  if (notices.length === 0) return null;

  return (
    <div className="notices" role="region" aria-live="polite">
      {notices.map((n, i) => {
        const { title, body, tone } = noticeText(n, t);
        return (
          <div key={`${n.kind}-${i}`} className="notice" data-tone={tone} role="alertdialog" aria-label={title}>
            <Icon name={n.kind === 'reward' || n.kind === 'milestone' ? 'reward' : 'flame'} size={22} />
            <div className="notice__text">
              <strong>{title}</strong>
              <p>{body}</p>
            </div>
            <Button variant="quiet" onClick={() => dismiss(i)} aria-label={t('common.close')}>
              ×
            </Button>
          </div>
        );
      })}
    </div>
  );
}
