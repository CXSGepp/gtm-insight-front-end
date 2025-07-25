import { createTheme } from '@mui/material';
import BackgroundImage from './assets/background.jpg';


declare module '@mui/material/styles' {
  // Define la estructura de tus colores para chips
  interface ChipColors {
    sin_prg: string;
    cdg: string;
    gj: string;
    default: string;
  }

  // Añade la nueva propiedad a la interfaz de la paleta
  interface Palette {
    chipColors: ChipColors;
  }

  // Haz lo mismo para PaletteOptions para que 'createTheme' la acepte
  interface PaletteOptions {
    chipColors?: ChipColors;
  }
}
const theme = createTheme({
  typography: {
    fontFamily: 'Nunito, sans-serif',
    fontWeightBold: 800,
    fontWeightRegular: 400,
    fontWeightLight: 300,
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#5C73F2',
      light: '#8A9DFE',
    },
    secondary: {
      main: '#F20F62',
    },
    background: {
      default: '#030640',
      paper: '#030640',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
    
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage:  `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundColor: '#0d1b3f', // Color de respaldo
        },
      },
    },
  },
});

export default theme;