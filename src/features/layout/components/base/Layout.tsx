import React from 'react';
import { Box, CssBaseline, Paper, ThemeProvider } from '@mui/material';
import Sidebar from './Sidebar';
import Title from './Title';
import theme from '../../../../theme';
import { useLayoutStore } from '../../store/useLayoutStore';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebarOpen } = useLayoutStore();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <Sidebar />

        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            ml: sidebarOpen ? '250px' : '70px',
            transition: 'margin-left 0.3s ease',
            py: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              px: 2,
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: '1200px', // ajusta según necesidad
              }}
            >
              <Title />
              <Paper
                elevation={2}
                sx={{
                  mt: 2,
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  overflowX: 'hidden',
                }}
              >
                {children}
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
