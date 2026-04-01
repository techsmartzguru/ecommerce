import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type AccentColor = 'blue' | 'purple' | 'green' | 'orange' | 'rose';
export type FontSize = 'small' | 'medium' | 'large';

const THEME_KEY = 'app-theme';
const ACCENT_KEY = 'app-accent';
const FONT_SIZE_KEY = 'app-font-size';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(THEME_KEY) as Theme) || 'system';
    }
    return 'system';
  });

  const [accent, setAccentState] = useState<AccentColor>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(ACCENT_KEY) as AccentColor) || 'blue';
    }
    return 'blue';
  });

  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(FONT_SIZE_KEY) as FontSize) || 'medium';
    }
    return 'medium';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Handle theme
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    
    // Handle accent color
    root.classList.remove('theme-blue', 'theme-purple', 'theme-green', 'theme-orange', 'theme-rose');
    if (accent !== 'blue') {
      root.classList.add(`theme-${accent}`);
    }
    
    localStorage.setItem(ACCENT_KEY, accent);
  }, [accent]);

  useEffect(() => {
    const root = document.documentElement;
    
    // Handle font size
    root.classList.remove('font-small', 'font-medium', 'font-large');
    root.classList.add(`font-${fontSize}`);
    
    localStorage.setItem(FONT_SIZE_KEY, fontSize);
  }, [fontSize]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const setAccent = (newAccent: AccentColor) => {
    setAccentState(newAccent);
  };

  const setFontSize = (newFontSize: FontSize) => {
    setFontSizeState(newFontSize);
  };

  const resolvedTheme = theme === 'system' 
    ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  return {
    theme,
    accent,
    fontSize,
    resolvedTheme,
    setTheme,
    setAccent,
    setFontSize,
  };
}
