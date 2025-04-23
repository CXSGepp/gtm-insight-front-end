import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Title: React.FC = () => {
  return (
<AppBar
  position="static"
  sx={{
    
    boxShadow: 'none',
    ml: '240px', // ancho del sidebar
    width: 'calc(100% - 240px)' // evita que se desborde
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
