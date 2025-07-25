import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useLayoutStore } from '../../store/useLayoutStore';
import Title from './Title';
import color from 'color';

export const Header = () => {
  // 1. Obtenemos la función 'toggleSidebar' en lugar de 'openSidebar'
  const { toggleSidebar } = useLayoutStore();

  // 2. Define los estilos del efecto de cristal, igual que en tu componente GlassCard
  const glassStyles = {
    background: color('#0D1C73').alpha(0.3).toString(), // Un color base con transparencia
    backdropFilter: 'blur(9px)',
    WebkitBackdropFilter: 'blur(9px)', // Para compatibilidad con Safari
    boxShadow: 'none', // El AppBar ya tiene su propia sombra, la controlamos con 'elevation'
  };
  return (
    <AppBar 
      position="fixed"
      sx={{
        
        ...glassStyles,
        zIndex: (theme) => theme.zIndex.drawer + 1,
     
      }}
    >
      <Toolbar>
        {/* 2. Este botón ahora alterna el estado y siempre está visible */}
        <IconButton
          color="inherit"
          aria-label="toggle drawer"
          onClick={toggleSidebar}
          edge="start"
          sx={{ mr: 2 }} // Eliminamos la visibilidad condicional
        >
          <MenuIcon />
        </IconButton>
       <Title/>
      </Toolbar>
    </AppBar>
  );
};