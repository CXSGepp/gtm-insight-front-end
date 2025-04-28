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
      <Paper
        sx={{
          overflowX: 'hidden',
          display: 'flex',
          minHeight: '100vh',
        }}
        elevation={0}
      >
        <Sidebar />
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            ml: sidebarOpen ? '240px' : '70px',
            transition: 'margin-left 0.3s ease',
          }}
        >
          <Title />
          <Box
            component={Paper}
            elevation={2}
            sx={{
              flex: 1,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {children}
          </Box>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default Layout;
