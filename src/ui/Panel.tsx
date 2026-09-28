import type { ReactNode } from 'react';

interface PanelProps {
  title?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  tone?: 'default' | 'accent' | 'warn';
  className?: string;
  as?: 'section' | 'article' | 'div';
}

export function Panel({ title, actions, children, tone = 'default', className = '', as = 'section' }: PanelProps) {
  const Tag = as;
  return (
    <Tag className={`panel ${className}`} data-tone={tone}>
      {(title || actions) && (
        <header className="panel__head">
          {title && <h2 className="panel__title">{title}</h2>}
          {actions && <div className="panel__actions">{actions}</div>}
        </header>
      )}
      <div className="panel__body">{children}</div>
    </Tag>
  );
}
