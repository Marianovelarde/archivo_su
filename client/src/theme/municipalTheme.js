import { createTheme } from '@mui/material/styles'

const municipalTheme = createTheme({
  palette: {
    primary: {
      main: '#1f4e79', // azul institucional
    },
    secondary: {
      main: '#6c757d',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 6,
  },
})

export default municipalTheme
