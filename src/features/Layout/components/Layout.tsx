import React from 'react';
import { Box, CssBaseline, Paper, ThemeProvider } from '@mui/material';
import Sidebar from './Sidebar';
import Title from './Title';
import theme from '../../../theme';
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
      
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
        <CssBaseline />
    </>
  );
};

export default Layout;
