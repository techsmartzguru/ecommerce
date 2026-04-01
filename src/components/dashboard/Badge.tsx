import { ReactNode } from 'react';

interface BadgeProps {
  variant: 'success' | 'warning' | 'destructive' | 'default' | 'primary';
  children: ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  const variants = {
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    destructive: 'bg-destructive/10 text-destructive',
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary/10 text-primary',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
