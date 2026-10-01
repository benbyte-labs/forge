import { useEffect } from 'react';
import { HashRouter, NavLink } from 'react-router-dom';
import { I18nProvider, LOCALES, LOCALE_FLAGS, LOCALE_NAMES, useT } from '../i18n';
import { Icon, Logo, Meter } from '../ui';
import { levelProgress } from '../engine/progress';
import { AppRoutes } from './routes';
import { NoticeStack } from './NoticeStack';
import { useStore } from './store';
import '../styles/base.css';

const NAV = [
  { to: '/', icon: 'dashboard', key: 'nav.dashboard', end: true },
  { to: '/tracks', icon: 'track', key: 'nav.tracks', end: false },
  { to: '/notebook', icon: 'notebook', key: 'nav.notebook', end: false },
  { to: '/rewards', icon: 'reward', key: 'nav.rewards', end: false },
] as const;

const LAB_NAV = [
  { to: '/lab/code', icon: 'code', key: 'nav.codelab' },
  { to: '/lab/robot', icon: 'robot', key: 'nav.robotlab' },
  { to: '/lab/physics', icon: 'physics', key: 'nav.physicslab' },
  { to: '/lab/cad', icon: 'cad', key: 'nav.cadlab' },
] as const;

function Sidebar() {
  const t = useT();
  const xp = useStore((s) => s.state.xp);
  const { level, into, span } = levelProgress(xp);

  return (
    <nav className="sidebar" aria-label={t('nav.dashboard')}>
      <div className="brand">
        <Logo size={30} />
        <span className="brand__name">FORGE</span>
      </div>

      <ul className="navlist">
        {NAV.map((n) => (
          <li key={n.to}>
            <NavLink to={n.to} end={n.end} className="navlink">
              <Icon name={n.icon} />
              <span>{t(n.key)}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <p className="navgroup">{t('nav.labs')}</p>
      <ul className="navlist">
        {LAB_NAV.map((n) => (
          <li key={n.to}>
            <NavLink to={n.to} className="navlink">
              <Icon name={n.icon} />
              <span>{t(n.key)}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="sidebar__foot">
        <div className="levelbox">
          <span className="levelbox__label">{t('dash.level', { n: level })}</span>
          <Meter value={into} max={span} label={t('dash.level', { n: level })} />
        </div>
        <NavLink to="/settings" className="navlink">
          <Icon name="settings" />
          <span>{t('nav.settings')}</span>
        </NavLink>
      </div>
    </nav>
  );
}

function TopBar() {
  const t = useT();
  const locale = useStore((s) => s.state.locale);
  const setLocale = useStore((s) => s.setLocale);
  const streak = useStore((s) => s.state.streak);

  return (
    <header className="topbar">
      <div className="streakpill" title={t('streak.best', { n: streak.best })}>
        <Icon name="flame" />
        <strong>{streak.current}</strong>
        <span className="streakpill__label">
          {streak.current > 0 ? t('streak.days', { n: streak.current }) : t('streak.none')}
        </span>
      </div>

      <div className="topbar__spacer" />

      <div className="langswitch" role="group" aria-label={t('settings.language')}>
        {LOCALES.map((l) => (
          <button
            key={l}
            type="button"
            className="langswitch__btn"
            aria-pressed={locale === l}
            title={LOCALE_NAMES[l]}
            onClick={() => setLocale(l)}
          >
            {LOCALE_FLAGS[l]} {l.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  );
}

function Shell() {
  const theme = useStore((s) => s.state.theme);
  const motion = useStore((s) => s.state.motion);
  const hydrate = useStore((s) => s.hydrate);
  const ready = useStore((s) => s.ready);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-motion', motion ? 'on' : 'off');
  }, [theme, motion]);

  if (!ready) return <div className="boot">FORGE</div>;

  return (
    <div className="shell">
      <Sidebar />
      <div className="shell__main">
        <TopBar />
        <main className="content">
          <AppRoutes />
        </main>
      </div>
      <NoticeStack />
    </div>
  );
}

export function App() {
  const locale = useStore((s) => s.state.locale);
  return (
    <I18nProvider locale={locale}>
      <HashRouter>
        <Shell />
      </HashRouter>
    </I18nProvider>
  );
}
