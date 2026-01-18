import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PropTypes from 'prop-types';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

// Create RTL cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const ThemeContext = createContext();

// Light theme palette
const lightPalette = {
  mode: 'light',
  primary: {
    main: '#0176D3',
    light: '#4A9CE8',
    dark: '#014486',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#5A67D8',
    light: '#818CF8',
    dark: '#3730A3',
    contrastText: '#ffffff',
  },
  success: {
    main: '#2E844A',
    light: '#4CAF6E',
    dark: '#1B5E20',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#DD7A01',
    light: '#F5A623',
    dark: '#B65500',
    contrastText: '#ffffff',
  },
  error: {
    main: '#C23934',
    light: '#E57373',
    dark: '#8E0000',
    contrastText: '#ffffff',
  },
  info: {
    main: '#0694A2',
    light: '#4DB6AC',
    dark: '#006064',
    contrastText: '#ffffff',
  },
  background: {
    default: '#F8FAFC',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#1E293B',
    secondary: '#64748B',
    disabled: '#94A3B8',
  },
  divider: '#E2E8F0',
  action: {
    active: '#64748B',
    hover: 'rgba(0, 0, 0, 0.04)',
    selected: 'rgba(1, 118, 211, 0.08)',
    disabled: '#CBD5E1',
    disabledBackground: '#F1F5F9',
  },
};

// Dark theme palette
const darkPalette = {
  mode: 'dark',
  primary: {
    main: '#5A9FDB',
    light: '#8ECAE6',
    dark: '#0176D3',
    contrastText: '#0F172A',
  },
  secondary: {
    main: '#7C86E2',
    light: '#A5B4FC',
    dark: '#5A67D8',
    contrastText: '#0F172A',
  },
  success: {
    main: '#4CAF6E',
    light: '#81C784',
    dark: '#2E844A',
    contrastText: '#0F172A',
  },
  warning: {
    main: '#F5A623',
    light: '#FFB74D',
    dark: '#DD7A01',
    contrastText: '#0F172A',
  },
  error: {
    main: '#E57373',
    light: '#EF9A9A',
    dark: '#C23934',
    contrastText: '#0F172A',
  },
  info: {
    main: '#4DB6AC',
    light: '#80CBC4',
    dark: '#0694A2',
    contrastText: '#0F172A',
  },
  background: {
    default: '#0F172A',
    paper: '#1E293B',
  },
  text: {
    primary: '#F1F5F9',
    secondary: '#94A3B8',
    disabled: '#64748B',
  },
  divider: '#334155',
  action: {
    active: '#94A3B8',
    hover: 'rgba(255, 255, 255, 0.08)',
    selected: 'rgba(90, 159, 219, 0.16)',
    disabled: '#475569',
    disabledBackground: '#1E293B',
  },
};

const getThemeOptions = (mode) => ({
  direction: 'rtl',
  palette: mode === 'dark' ? darkPalette : lightPalette,
  typography: {
    fontFamily: '"Cairo", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem', lineHeight: 1.2 },
    h2: { fontWeight: 700, fontSize: '2rem', lineHeight: 1.25 },
    h3: { fontWeight: 600, fontSize: '1.75rem', lineHeight: 1.3 },
    h4: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.35 },
    h5: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.4 },
    h6: { fontWeight: 600, fontSize: '1rem', lineHeight: 1.5 },
    subtitle1: { fontWeight: 500, fontSize: '1rem', lineHeight: 1.5 },
    subtitle2: { fontWeight: 500, fontSize: '0.875rem', lineHeight: 1.5 },
    body1: { fontSize: '1rem', lineHeight: 1.5 },
    body2: { fontSize: '0.875rem', lineHeight: 1.5 },
    button: { fontWeight: 600, textTransform: 'none' },
    caption: { fontSize: '0.75rem', lineHeight: 1.5 },
    overline: { fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.05)',
    '0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 2px 4px rgba(0, 0, 0, 0.1)',
    '0px 4px 6px rgba(0, 0, 0, 0.1)',
    '0px 6px 8px rgba(0, 0, 0, 0.1)',
    '0px 8px 10px rgba(0, 0, 0, 0.1)',
    '0px 10px 12px rgba(0, 0, 0, 0.1)',
    '0px 12px 14px rgba(0, 0, 0, 0.1)',
    '0px 14px 16px rgba(0, 0, 0, 0.1)',
    '0px 16px 18px rgba(0, 0, 0, 0.1)',
    ...Array(14).fill('0px 16px 18px rgba(0, 0, 0, 0.1)'),
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: mode === 'dark' ? '#0F172A' : '#F8FAFC',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: mode === 'dark' ? '#475569' : '#CBD5E1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: mode === 'dark' ? '#64748B' : '#94A3B8',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
          border: `1px solid ${mode === 'dark' ? '#334155' : '#E2E8F0'}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('themeMode');
      if (savedMode) return savedMode;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = useMemo(() => createTheme(getThemeOptions(mode)), [mode]);

  const value = useMemo(
    () => ({
      mode,
      isDark: mode === 'dark',
      toggleTheme,
    }),
    [mode, toggleTheme]
  );

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeContext.Provider value={value}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </CacheProvider>
  );
};

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }
  return context;
};

export default ThemeContext;
