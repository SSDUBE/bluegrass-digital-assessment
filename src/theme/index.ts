import { Theme } from '../types';

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
      regular: 'Mulish-Regular',
      medium: 'Mulish-Medium',
      bold: 'Mulish-Bold',
    },
  },
};
