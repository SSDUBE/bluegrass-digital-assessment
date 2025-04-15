import { Theme } from '../types';

// Use system fonts with fallbacks
export const fonts = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
};

export const theme: Theme = {
  colors: {
    primary: '#0056B8',
    secondary: '#10b981',
    background: '#F2F7FB',
    card: '#ffffff',
    text: '#333333',
    border: '#f0f0f0',
    notification: '#ef4444',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    //Test value colors
    testValueNormal: '#066D37',
    testValueHigh: '#BA1B1B',
    testValueDefault: '#333333',
  },
  spacing: {
    xs: 5,
    s: 10,
    m: 15,
    l: 20,
    xl: 30,
  },
  borderRadius: {
    s: 5,
    m: 10,
    l: 20,
    xl: 25,
  },
  typography: {
    fontSizes: {
      xs: 12,
      s: 14,
      m: 16,
      l: 20,
      xl: 24,
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      bold: 600,
    },
    fontFamily: {
      regular: fonts.regular,
      medium: fonts.medium,
      bold: fonts.bold,
    },
  },
};
