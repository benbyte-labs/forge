import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BlockRenderer } from '../BlockRenderer';

describe('BlockRenderer', () => {
  it('renders markdown bold', () => {
    render(<BlockRenderer block={{ k: 'text', md: 'A **változó** adatot tárol.' }} />);
    expect(screen.getByText('változó').tagName).toBe('STRONG');
  });

  it('renders inline code', () => {
    render(<BlockRenderer block={{ k: 'text', md: 'Használd a `print()` hívást.' }} />);
    expect(screen.getByText('print()').tagName).toBe('CODE');
  });

  it('renders a bullet list', () => {
    render(<BlockRenderer block={{ k: 'text', md: '- egy\n- kettő' }} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('renders a code block with its language', () => {
    render(<BlockRenderer block={{ k: 'code', lang: 'py', src: 'x = 1' }} />);
    expect(screen.getByText(/x = 1/)).toBeInTheDocument();
    expect(screen.getByText('py')).toBeInTheDocument();
  });

  it('renders a callout with its tone', () => {
    render(<BlockRenderer block={{ k: 'callout', tone: 'warn', md: 'Vigyázz' }} />);
    expect(screen.getByRole('note')).toHaveAttribute('data-tone', 'warn');
  });

  it('renders a formula with its explanation', () => {
    render(<BlockRenderer block={{ k: 'formula', tex: 'v = s/t', explain: 'Sebesség' }} />);
    expect(screen.getByText('Sebesség')).toBeInTheDocument();
  });

  it('renders an unknown block as nothing rather than crashing', () => {
    // @ts-expect-error deliberately invalid block kind
    const { container } = render(<BlockRenderer block={{ k: 'nope' }} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('escapes html in content rather than injecting it', () => {
    render(<BlockRenderer block={{ k: 'text', md: 'a <img src=x onerror=1> b' }} />);
    expect(document.querySelector('img')).toBeNull();
  });
});
