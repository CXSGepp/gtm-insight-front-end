// src/layout/Layout.tsx
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
          display: 'flex',
          flexDirection: 'row',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
        }}
        elevation={0}
      >
        <Sidebar />
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto', // permite scroll vertical interno
            display: 'flex',
            flexDirection: 'column',
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
              overflowX: 'hidden', // evita desbordes laterales
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
