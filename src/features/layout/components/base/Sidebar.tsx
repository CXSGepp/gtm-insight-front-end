import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Drawer,
  useTheme,
  useMediaQuery,
  IconButton, // 1. Importa IconButton
} from '@mui/material';
import { useRouterState } from '@tanstack/react-router';
import { ExpandLess, ExpandMore, Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import geppLogo from '../../../../assets/geppLogo.png';
import GEPP_Logo_fondo_blanco from '../../../../assets/GEPP_Logo_fondo_blanco.png';
import { navigationItems } from '../../config/navigation';
import { useLayoutStore } from '../../store/useLayoutStore';

const DrawerContent = () => {
  // 3. Obtén la función 'toggleSidebar' del store
  const { sidebarOpen, closeSidebar } = useLayoutStore();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const theme = useTheme();

  const handleToggle = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isRouteActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
      <Box>
      {/* 2. La cabecera ahora solo tiene el botón de cierre */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end', // Alinea el botón a la derecha
          px: 1,
          ...theme.mixins.toolbar, // Usa el alto estándar de la toolbar
        }}
      >
        <IconButton onClick={closeSidebar}>
          <ChevronLeftIcon sx={{ color: '#03178C' }} />
        </IconButton>
      </Box>
      <Divider sx={{ borderColor: 'rgba(3, 23, 140, 0.5)', mb: 2 }} />

      {/* El resto de la lista de navegación no cambia */}
         <Box sx={{ px: 2, py: 2, display: 'flex', justifyContent: 'center' }}>
        <img
          src={geppLogo}
          alt="GEPP Logo"
          style={{
            width: sidebarOpen ? '120px' : '40px',
            height: 'auto',
            transition: 'width 0.3s ease',
          }}
        />
      </Box>
            <Divider sx={{ borderColor: 'rgba(3, 23, 140, 0.5)', mb: 2 }} />

      <List component="nav" disablePadding>
        {navigationItems.map((item) =>
          item.children && Array.isArray(item.children) ? (
            <React.Fragment key={item.key}>
              <ListItemButton
                onClick={() => handleToggle(item.key)}
                sx={{
                  minHeight: 48,
                  justifyContent: sidebarOpen ? 'initial' : 'center',
                  px: 2.5,
                  color: '#03178C',
                  borderRadius: 2,
                  '&:hover, &.Mui-selected': {
                    backgroundColor: 'rgba(3, 23, 140, 0.1)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sidebarOpen ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'inherit',
                  }}
                >
                  <item.icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{ 
                    opacity: sidebarOpen ? 1 : 0,
                    transition: theme.transitions.create('opacity', {
                      duration: theme.transitions.duration.shortest,
                    }),
                  }} 
                />
                {sidebarOpen &&
                  (openMenus[item.key] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>

              <Collapse in={openMenus[item.key]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child) =>
                    child.path ? (
                      <ListItemButton
                        key={child.key}
                        component={Link}
                        to={child.path}
                        selected={isRouteActive(child.path)}
                        sx={{
                          minHeight: 48,
                          justifyContent: sidebarOpen ? 'initial' : 'center',
                          pl: sidebarOpen ? 6 : 2.5,
                          color: '#03178C',
                          borderRadius: 2,
                          '&:hover, &.Mui-selected': {
                            backgroundColor: 'rgba(3, 23, 140, 0.1)',
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: sidebarOpen ? 3 : 'auto',
                            justifyContent: 'center',
                            color: 'inherit',
                          }}
                        >
                          <child.icon />
                        </ListItemIcon>
                        <ListItemText
                          primary={child.label}
                          sx={{ 
                            opacity: sidebarOpen ? 1 : 0,
                            transition: theme.transitions.create('opacity', {
                              duration: theme.transitions.duration.shortest,
                            }),
                          }}
                        />
                      </ListItemButton>
                    ) : null
                  )}
                </List>
              </Collapse>
            </React.Fragment>
          ) : item.path ? (
            <ListItemButton
              key={item.key}
              component={Link}
              to={item.path}
              selected={isRouteActive(item.path)}
              sx={{
                minHeight: 48,
                justifyContent: sidebarOpen ? 'initial' : 'center',
                px: 2.5,
                color: '#03178C',
                borderRadius: 2,
                '&:hover, &.Mui-selected': {
                  backgroundColor: 'rgba(1, 2, 26, 0.85)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: sidebarOpen ? 3 : 'auto',
                  justifyContent: 'center',
                  color: 'inherit',
                }}
              >
                <item.icon />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{ 
                  opacity: sidebarOpen ? 1 : 0,
                  transition: theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shortest,
                  }),
                }}
              />
            </ListItemButton>
          ) : null
        )}
      </List>
    </Box>
  );
};

// El componente Sidebar principal no necesita cambios
export const Sidebar = () => {
  const { sidebarOpen, closeSidebar } = useLayoutStore();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const drawerWidth = 250;
  const collapsedDrawerWidth = 70;

  return (
    <Drawer
      variant={isDesktop ? 'permanent' : 'temporary'}
      open={isDesktop ? true : sidebarOpen}
      onClose={closeSidebar}
      PaperProps={{
        sx: {
          background: 'rgba(213, 223, 229, 0.52)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRight: '1px solid rgba(216, 241, 255, 0.3)',
          boxSizing: 'border-box',
          width: sidebarOpen ? drawerWidth : collapsedDrawerWidth,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
        },
      }}
    >
      <DrawerContent />
    </Drawer>
  );
};

export default Sidebar;