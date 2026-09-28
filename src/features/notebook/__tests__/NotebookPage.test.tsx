import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { useStore } from '../../../app/store';
import { renderRoute, resetStore } from '../../../test-utils';

/** Finish a day the way a learner would, so the note is real, not hand-built. */
function finishCodeDay(day: number, answers: unknown[]) {
  const s = useStore.getState();
  s.completeLesson('code', day);
  s.submitQuiz('code', day, answers as never[]);
}

beforeEach(resetStore);

describe('notebook', () => {
  it('invites the learner to start when there are no notes', () => {
    renderRoute('/notebook');
    expect(screen.getByText(/még nincs jegyzeted/i)).toBeInTheDocument();
  });

  it('lists a note after a lesson is finished', () => {
    finishCodeDay(1, [1, 1, 2, [1, 3], 11]);
    renderRoute('/notebook');
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByText(/Változók és típusok/)).toBeInTheDocument();
  });

  it('shows the watch-out block only for what was got wrong', () => {
    finishCodeDay(1, [0, 0, 0, [0], 0]);
    renderRoute('/notebook');
    expect(screen.getByText(/figyelj erre/i)).toBeInTheDocument();
  });

  it('filters notes as the learner types, ignoring accents', async () => {
    finishCodeDay(1, [1, 1, 2, [1, 3], 11]);
    finishCodeDay(2, [1, 1, 1, 1]);
    renderRoute('/notebook');
    const user = userEvent.setup();
    expect(screen.getAllByRole('article')).toHaveLength(2);
    await user.type(screen.getByRole('searchbox'), 'elagazas');
    await waitFor(() => expect(screen.getAllByRole('article')).toHaveLength(1));
  });

  it('says so when nothing matches instead of showing an empty page', async () => {
    finishCodeDay(1, [1, 1, 2, [1, 3], 11]);
    renderRoute('/notebook');
    const user = userEvent.setup();
    await user.type(screen.getByRole('searchbox'), 'szervomotor');
    await waitFor(() => expect(screen.getByText(/nincs találat/i)).toBeInTheDocument());
  });

  it('saves a personal annotation', async () => {
    finishCodeDay(1, [1, 1, 2, [1, 3], 11]);
    renderRoute('/notebook');
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: /saját jegyzet/i }), 'gyakorolni');
    await user.tab();
    await waitFor(() => expect(useStore.getState().state.notes[0].userNote).toBe('gyakorolni'));
  });

  it('filters to only the notes with mistakes', async () => {
    finishCodeDay(1, [1, 1, 2, [1, 3], 11]);
    finishCodeDay(2, [0, 0, 0, 0]);
    renderRoute('/notebook');
    const user = userEvent.setup();
    await user.click(screen.getByRole('checkbox', { name: /csak amit elrontottam/i }));
    await waitFor(() => expect(screen.getAllByRole('article')).toHaveLength(1));
  });
});
