'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/core/providers/theme.provider';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="size-9 rounded-md"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        // <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Icon icon="iconamoon:mode-dark" className="absolute size-5" />
      ) : (
        <Icon icon="iconamoon:mode-light" className="size-5" />
      )}
    </Button>
  );
}
