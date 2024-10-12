// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
      },
  colorSchemes: { light: true, dark: true },
  palette: {
    primary: {
      main: '#1976d2', // Customize the primary color
    },
    secondary: {
      main: '#d32f2f', // Customize the secondary color
    },
  },
  typography: {
    button: {
      textTransform: 'none', // Sentence case buttons globally
    },
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
      },
   },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {          
          borderRadius: '8px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '20px',
        },
      },
    },
  },
});

export default theme;
