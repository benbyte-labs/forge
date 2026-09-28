import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  tone?: 'accent' | 'ok' | 'warn' | 'danger' | 'muted';
  title?: string;
}

export function Badge({ children, tone = 'muted', title }: BadgeProps) {
  return (
    <span className="badge" data-tone={tone} title={title}>
      {children}
    </span>
  );
}
