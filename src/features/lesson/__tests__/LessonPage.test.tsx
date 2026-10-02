import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { getDay } from '../../../content';
import { dayKey } from '../../../engine/progress';
import { renderRoute, resetStore } from '../../../test-utils';

beforeEach(resetStore);

/** The first and last lesson block of code day 1, as rendered text fragments. */
const FIRST = /Egy program adatokkal dolgozik/;
const LAST = /Hat hónap múlva/;

/** Every lesson block is a step, and a day with a lab gets one more for it. */
function stepCount(): number {
  const d = getDay('code', 'hu', 1)!;
  return d.lesson.length + (d.lab ? 1 : 0);
}

describe('lesson pagination', () => {
  it('has a day worth paginating', () => {
    // Guards the fixtures below: if day 1 ever shrinks to one block, these
    // tests would pass for the wrong reason.
    expect(getDay('code', 'hu', 1)!.lesson.length).toBeGreaterThan(2);
  });

  it('shows only the first step on arrival, not the whole lesson', () => {
    renderRoute('/track/code/1');
    expect(screen.getByText(FIRST)).toBeInTheDocument();
    expect(screen.queryByText(LAST)).not.toBeInTheDocument();
  });

  it('replaces the step rather than appending to it', async () => {
    const user = userEvent.setup();
    renderRoute('/track/code/1');
    await user.click(screen.getByRole('button', { name: /tovább/i }));
    expect(screen.queryByText(FIRST)).not.toBeInTheDocument();
  });

  it('gives the lab its own step at the end, after the last block', async () => {
    const user = userEvent.setup();
    renderRoute('/track/code/1');

    const blocks = getDay('code', 'hu', 1)!.lesson.length;
    for (let i = 0; i < blocks - 1; i++) {
      await user.click(screen.getByRole('button', { name: /tovább/i }));
    }
    expect(screen.getByText(LAST)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /tovább/i }));
    expect(screen.queryByText(LAST)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /futtatás/i })).toBeInTheDocument();
  });

  it('offers the quiz only on the final step', async () => {
    const user = userEvent.setup();
    renderRoute('/track/code/1');

    expect(screen.queryByRole('button', { name: /kvíz/i })).not.toBeInTheDocument();
    for (let i = 0; i < stepCount() - 1; i++) {
      await user.click(screen.getByRole('button', { name: /tovább/i }));
    }

    expect(screen.queryByRole('button', { name: /tovább/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /kvíz/i })).toBeInTheDocument();
  });

  it('can step back to re-read the previous block', async () => {
    const user = userEvent.setup();
    renderRoute('/track/code/1');
    await user.click(screen.getByRole('button', { name: /tovább/i }));
    await user.click(screen.getByRole('button', { name: /vissza/i }));
    expect(screen.getByText(FIRST)).toBeInTheDocument();
  });

  it('marks the lesson done once the learner reaches the end', async () => {
    const user = userEvent.setup();
    renderRoute('/track/code/1');

    for (let i = 0; i < stepCount() - 1; i++) {
      await user.click(screen.getByRole('button', { name: /tovább/i }));
    }

    const { useStore } = await import('../../../app/store');
    expect(useStore.getState().state.days[dayKey('code', 1)]?.lessonDone).toBe(true);
  });
});
