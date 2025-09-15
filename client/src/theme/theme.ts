import { createTheme } from '@mui/material/styles';

// Основные цвета из существующей схемы
const primaryColor = 'rgb(135, 50, 190)';
const primaryDarkColor = 'rgb(88, 22, 133)';
const errorColor = '#ff4d4f';
const textPrimary = '#333';
const textSecondary = '#555';
const textTertiary = '#777';
const backgroundLight = '#f9f9f9';
const borderColor = '#ddd';

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      dark: primaryDarkColor,
      light: 'rgb(160, 80, 220)',
      contrastText: '#fff',
    },
    secondary: {
      main: textSecondary,
      light: textTertiary,
      dark: textPrimary,
      contrastText: '#fff',
    },
    error: {
      main: errorColor,
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
    text: {
      primary: textPrimary,
      secondary: textSecondary,
    },
    grey: {
      100: backgroundLight,
      300: borderColor,
      500: textTertiary,
      700: textSecondary,
      900: textPrimary,
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: textPrimary,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: textPrimary,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: textPrimary,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: textPrimary,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 500,
      color: textPrimary,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: textPrimary,
    },
    body1: {
      fontSize: '1rem',
      color: textPrimary,
    },
    body2: {
      fontSize: '0.875rem',
      color: textSecondary,
    },
    caption: {
      fontSize: '0.75rem',
      color: textTertiary,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        body: {
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          overflowX: 'hidden',
        },
        html: {
          margin: 0,
          padding: 0,
          height: '100%',
        },
        '#root': {
          margin: 0,
          padding: 0,
          minHeight: '100vh',
        },
        footer: {
          margin: 0,
          padding: 0,
          border: 'none',
          outline: 'none',
        },
        main: {
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '16px',
          paddingRight: '16px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: '16px',
          padding: '10px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          backgroundColor: primaryColor,
          '&:hover': {
            backgroundColor: primaryDarkColor,
          },
          '&:disabled': {
            backgroundColor: '#999',
            color: '#fff',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 5,
            '& fieldset': {
              borderColor: borderColor,
            },
            '&:hover fieldset': {
              borderColor: primaryColor,
            },
            '&.Mui-focused fieldset': {
              borderColor: primaryColor,
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 5,
        },
        standardError: {
          backgroundColor: '#ffebee',
          color: errorColor,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 5,
        },
      },
    },
  },
});
