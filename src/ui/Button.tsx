import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger' | 'quiet';
  loading?: boolean;
  children: ReactNode;
}

export function Button({ variant = 'ghost', loading = false, children, disabled, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className="btn"
      data-variant={variant}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      {...rest}
    >
      {children}
    </button>
  );
}
