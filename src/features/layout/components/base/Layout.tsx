import React from 'react';
import {  Box, CssBaseline, ThemeProvider } from '@mui/material';
import Sidebar from './Sidebar';
import theme from '../../../../theme';
import { useLayoutStore } from '../../store/useLayoutStore';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebarOpen } = useLayoutStore();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
  <Header />
        <Sidebar />

          <Box
            sx={{
              ml: sidebarOpen ? '250px' : '70px',
              p: 10,
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              px: 2,
            }}
          >
                {children}

          </Box>
   
      
    </ThemeProvider>
  );
};

export default Layout;
