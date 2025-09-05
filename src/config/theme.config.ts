interface ColorConfig {
  background: string;
  foreground: string;
}
interface ShapeConfig {
  parent: string;
  child: string;
}

interface ThemeConfig {
  light: {
    background: string;
    foreground: string;
    card: ColorConfig;
    popover: ColorConfig;
    primary: ColorConfig;
    secondary: ColorConfig;
    muted: ColorConfig;
    accent: ColorConfig;
    destructive: ColorConfig;
    warning: ColorConfig;
    success: ColorConfig;
    info: ColorConfig;
    border: string;
    input: string;
    ring: string;
    shapeV1: ShapeConfig;
    shapeV2: ShapeConfig;
  };
  dark: {
    background: string;
    foreground: string;
    card: ColorConfig;
    popover: ColorConfig;
    primary: ColorConfig;
    secondary: ColorConfig;
    muted: ColorConfig;
    accent: ColorConfig;
    destructive: ColorConfig;
    warning: ColorConfig;
    success: ColorConfig;
    info: ColorConfig;
    border: string;
    input: string;
    ring: string;
    shapeV1: ShapeConfig;
    shapeV2: ShapeConfig;
  };
}

export const themeConfig: ThemeConfig = {
  light: {
    background: '#EAEBED',
    foreground: '#0E0A17',
    card: {
      background: '#FFFFFF',
      foreground: '#0E0A17',
    },
    popover: {
      background: '#FFFFFF',
      foreground: '#0E0A17',
    },
    primary: {
      background: '#FFBE5D',
      foreground: '#0E0A17',
    },
    secondary: {
      background: '#F5EAFF',
      foreground: '#0E0A17',
    },
    muted: {
      background: '#F5EAFF',
      foreground: '#0E0A17',
    },
    accent: {
      background: '#F5EAFF',
      foreground: '#0E0A17',
    },
    destructive: {
      background: '#FA0C00',
      foreground: '#FFFFFF',
    },
    warning: {
      background: '#FECA13',
      foreground: '#FECA1322',
    },
    success: {
      background: '#28DE25',
      foreground: '#28DE2522',
    },
    info: {
      background: '#04B4FC',
      foreground: '#04B4FC22',
    },
    border: 'rgba(245, 234, 255, 0.3)',
    input: '#FFBE5D',
    ring: '#000000',
    shapeV1: {
      parent: '#F3AF4A',
      child: '#FFBE5D',
    },
    shapeV2: {
      child: '#',
      parent: '#',
    },
  },
  dark: {
    background: '#0E0A17',
    foreground: '#F5EAFF',
    card: {
      background: '#2A2A2A',
      foreground: '#F5EAFF',
    },
    popover: {
      background: '#2A2A2A',
      foreground: '#F5EAFF',
    },
    primary: {
      background: '#175753',
      foreground: '#000000',
    },
    secondary: {
      background: '#2A2A2A',
      foreground: '#F5EAFF',
    },
    muted: {
      background: '#2A2A2A',
      foreground: 'rgba(245, 234, 255, 0.6)',
    },
    accent: {
      background: '#2A2A2A',
      foreground: '#F5EAFF',
    },
    destructive: {
      background: '#FA0C00',
      foreground: '#F5EAFF',
    },
    warning: {
      background: '#FECA13',
      foreground: '#FECA1322',
    },
    success: {
      background: '#28DE25',
      foreground: '#28DE2522',
    },
    info: {
      background: '#04B4FC',
      foreground: '#04B4FC22',
    },
    border: 'rgba(245, 234, 255, 0.1)',
    input: '#175753',
    ring: '#FCF7F8',
    shapeV1: {
      parent: '#175753',
      child: '#0A4440',
    },
    shapeV2: {
      child: '#',
      parent: '#',
    },
  },
};
