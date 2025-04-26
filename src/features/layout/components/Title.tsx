import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useLayoutStore } from '../store/useLayoutStore';

const Title: React.FC = () => {
  const { sidebarOpen } = useLayoutStore();

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 'none',
        ml: sidebarOpen ? '240px' : '70px',
        width: `calc(100% - ${sidebarOpen ? '240px' : '70px'})`,
        transition: 'all 0.3s ease',
      }}
      elevation={0}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Reporte GEPP En Tus Manos
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Title;
