import { createTheme } from '@mui/material'

export const colors = {
  primary: {
    500: '#173f5f'
  },
  secondary: {
    500: '#3CAE3'
  },
  accent: {
    500: '#49beb7'
  },
  background: {
    500: '#ffffff'
  },
  white: {
    500: '#ffffff'
  }
}

export const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary[500],
      contrastText: colors.white[500],
    },
    secondary: {
      main: colors.secondary[500],
    },
    success: {
      main: colors.accent[500],
    },
  },
  typography: {
    fontFamily: '"Montserrat Alternates", "Roboto", "Helvetica", "Arial", sans-serif',
    body1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    body2: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    button: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    caption: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    overline: {
      fontFamily: '"Montserrat Alternates", "Roboto", "Helvetica", "Arial", sans-serif',
    },
  }
}

export const theme = createTheme(themeOptions)