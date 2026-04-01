import { useTheme } from '@/hooks/useTheme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // This ensures theme classes are always applied to the document root
  useTheme();
  return <>{children}</>;
}
