import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useLayoutStore } from '../../store/useLayoutStore';

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
        bgcolor: '#121212', // Aseguramos que el fondo sea oscuro
      }}
      elevation={0}
    >
      <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff' }}>
          Reporte GEPP En Tus Manos
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: '0.9rem', color: '#f50057', mt: 1 }}
        >
          Estás en la versión de pruebas
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Title;
