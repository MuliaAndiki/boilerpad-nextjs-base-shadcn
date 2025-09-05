'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { themeConfig } from '@/src/config/theme.config';
import React from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyThemeConfig(theme: Theme) {
  const themeValues = themeConfig[theme];
  Object.entries(themeValues).forEach(([key, value]) => {
    if (typeof value === 'string') {
      document.documentElement.style.setProperty(`--${key}`, value);
    } else if (typeof value === 'object' && value !== null) {
      if ('background' in value && 'foreground' in value) {
        document.documentElement.style.setProperty(`--${key}`, value.background);
        document.documentElement.style.setProperty(`--${key}-foreground`, value.foreground);
      }
      if ('parent' in value && 'child' in value) {
        document.documentElement.style.setProperty(`--${key}-parent`, value.parent);
        document.documentElement.style.setProperty(`--${key}-child`, value.child);
      }
    }
  });
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let finalTheme: Theme = 'light';
    if (storedTheme) {
      finalTheme = storedTheme;
    } else if (prefersDark) {
      finalTheme = 'dark';
    }

    setTheme(finalTheme);
    document.documentElement.classList.toggle('dark', finalTheme === 'dark');
    applyThemeConfig(finalTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
    applyThemeConfig(newTheme);
  };

  if (!mounted) return null;

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
