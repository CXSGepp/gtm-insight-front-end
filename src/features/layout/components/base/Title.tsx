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
        bgcolor: 'transparent',
      }}
      elevation={0}
    >
      <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
`      <Typography
  variant="h4"
  sx={{
    fontWeight: 'fontWeightBold',
    color: '#F2F2F2',
    textShadow: '0 6px 8px #040FD9, 0 3px 4px #CC0000',
    animation: 'textShadowAnim 3s ease-in-out infinite alternate'
  }}
>
  Dashboard GEPP en tus Manos
</Typography>
      {/** 
              <Typography
          variant="body2"
          sx={{ fontSize: '0.9rem', color: '#f50057', mt: 1 }}
        >
          Estás utilizando la versión de pruebas. Los datos y funcionalidades pueden no estar finalizados.
        </Typography>
      */}

      </Toolbar>
    </AppBar>
  );
};

export default Title;
