import { themeConfig } from '@/app/config/theme.config';

export const applyThemeConfig = (theme: 'light' | 'dark') => {
  const config = themeConfig[theme];

  Object.entries(config).forEach(([key, value]) => {
    if (typeof value === 'string') {
      document.documentElement.style.setProperty(`--${key}`, value);
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([childKey, childValue]) => {
        document.documentElement.style.setProperty(`--${key}-${childKey}`, childValue);
      });
    }
  });
};
