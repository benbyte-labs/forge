import { render, type RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './app/routes';
import { useStore } from './app/store';
import { I18nProvider } from './i18n';

/**
 * Mount the app at one route with a clean store, the way a learner would
 * arrive at that screen.
 */
export function renderRoute(path: string): RenderResult {
  const locale = useStore.getState().state.locale;
  return render(
    <I18nProvider locale={locale}>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </I18nProvider>,
  );
}

export function resetStore() {
  localStorage.clear();
  useStore.getState().resetForTest();
}
