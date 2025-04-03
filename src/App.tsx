import { ApolloProvider } from '@apollo/client';
import { client } from './api/graphqlClient';
import Dashboard from './pages/Dashboard';
import { Box, createTheme, CssBaseline, Paper, ThemeProvider, } from '@mui/material';
import Sidebar from './components/Sidebar';

interface AppProps {
  children?: React.ReactNode; // Allow children
}

function App({ children }: AppProps) {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: '#0540F2',
        contrastText: '#fff',
      },

    },
    typography: {
      fontFamily: 'Nunito, sans-serif',
      fontWeightBold: 700,
      fontWeightRegular: 400,
      fontWeightLight: 300,
    }
  })
  return (
    <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>

    <Paper sx={{ minHeight: '100vh', display: 'flex' }} elevation={0}>
          <Sidebar />
          <Box
            component={Paper}
            elevation={2}
            sx={{
              flex: 1,
              p: 3,
              bgcolor: 'background.paper',
              borderRadius: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {children}
          </Box>
        </Paper>
    </ThemeProvider>
    </ApolloProvider>
  );
}

export default App; 