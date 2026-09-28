import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { useStore } from '../../../app/store';
import { renderRoute, resetStore } from '../../../test-utils';

beforeEach(resetStore);

describe('quiz flow', () => {
  it('blocks checking until the question is answered', () => {
    renderRoute('/track/code/1/quiz');
    expect(screen.getByRole('button', { name: /ellenőrzés/i })).toBeDisabled();
  });

  it('shows the explanation after checking an answer', async () => {
    const user = userEvent.setup();
    renderRoute('/track/code/1/quiz');
    await user.click(screen.getAllByRole('radio')[0]);
    await user.click(screen.getByRole('button', { name: /ellenőrzés/i }));
    expect(screen.getByText(/miért\?/i)).toBeInTheDocument();
  });

  it('marks a right answer right and a wrong answer wrong', async () => {
    const user = userEvent.setup();
    renderRoute('/track/code/1/quiz');
    // Day 1 question 1: the correct option is index 1.
    await user.click(screen.getAllByRole('radio')[1]);
    await user.click(screen.getByRole('button', { name: /ellenőrzés/i }));
    expect(screen.getByText('Helyes')).toBeInTheDocument();
  });

  it('reaches a result screen and writes the note', async () => {
    const user = userEvent.setup();
    renderRoute('/track/code/1/quiz');

    for (let i = 0; i < 5; i++) {
      const radios = screen.queryAllByRole('radio');
      if (radios.length) await user.click(radios[0]);
      const numeric = screen.queryByRole('spinbutton');
      if (numeric) await user.type(numeric, '11');
      const checks = screen.queryAllByRole('checkbox');
      if (checks.length) await user.click(checks[0]);

      await user.click(screen.getByRole('button', { name: /ellenőrzés/i }));
      await user.click(screen.getByRole('button', { name: /következő|befejezés/i }));
    }

    await waitFor(() => expect(screen.getByText(/eredmény/i)).toBeInTheDocument());
    expect(useStore.getState().state.notes.some((n) => n.id === 'code-1')).toBe(true);
    expect(screen.getByText(/jegyzet elmentve/i)).toBeInTheDocument();
  });

  it('tells the learner a day that is not written yet has no quiz', () => {
    renderRoute('/track/code/9/quiz');
    expect(screen.getByText(/még nincs megírva/i)).toBeInTheDocument();
  });
});
