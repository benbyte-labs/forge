import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Meter } from '../Meter';

describe('Meter', () => {
  it('reports progress to assistive tech', () => {
    render(<Meter value={30} max={120} label="XP" />);
    const bar = screen.getByRole('progressbar', { name: 'XP' });
    expect(bar).toHaveAttribute('aria-valuenow', '30');
    expect(bar).toHaveAttribute('aria-valuemax', '120');
  });

  it('clamps out-of-range values', () => {
    render(<Meter value={999} max={100} label="XP" />);
    expect(screen.getByRole('progressbar', { name: 'XP' })).toHaveAttribute('aria-valuenow', '100');
  });

  it('never divides by a zero maximum', () => {
    render(<Meter value={5} max={0} label="XP" />);
    expect(screen.getByRole('progressbar', { name: 'XP' })).toHaveAttribute('aria-valuenow', '0');
  });
});
