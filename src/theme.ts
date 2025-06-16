import { createTheme } from '@mui/material';

const theme = createTheme({
palette: {
  mode: "dark",
  primary: {
    light: '#0528F2',
    main: '#0540F2',
    contrastText: '#S',
  },
  background: {
    default: '#121212',
    paper: '#00010D',
  },
},
typography: {
  fontFamily: 'Nunito, sans-serif',
  fontWeightBold: 800,
  fontWeightRegular: 400,
  fontWeightLight: 300,
},
  components: {
    MuiTable: {
        styleOverrides: {
            root: {
            borderCollapse: 'collapse',
            borderSpacing: 0,
            width: '100%',
            },
        },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '6px 12px',
          fontSize: '0.85rem',
          borderBottom: '1px solid rgba(224, 224, 224, 1)',


        },
        head: {
          backgroundColor: '#010326',
          fontWeight: 'bold',
          color: '#F2F2F2',
          backdropFilter: 'blur(8px)',
          position: 'sticky',
          top: 0,
        },
      },
    },
  },
});

export default theme;
