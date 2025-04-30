import React, { useState } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Collapse,
} from '@mui/material';
import { useRouterState } from '@tanstack/react-router';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import geppLogo from '../../../../assets/geppLogo.png';
import { navigationItems } from '../../config/navigation';
import { useLayoutStore } from '../../store/useLayoutStore';

export const Sidebar = () => {
  const { sidebarOpen } = useLayoutStore();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isRouteActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <Paper
      sx={{
        p: 2,
        backgroundColor: '#010326',
        width: sidebarOpen ? 250 : 70,
        transition: 'width 0.3s ease',
        position: 'fixed',
        height: '100vh',
        zIndex: 1000,
      }}
    >
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

      <Divider sx={{ borderColor: '#03178C', mb: 2 }} />

      <List component="nav" disablePadding>
        {navigationItems.map((item) =>
          item.children && Array.isArray(item.children) ? (
            <React.Fragment key={item.key}>
              <ListItemButton
                onClick={() => handleToggle(item.key)}
                sx={{
                  color: '#F2F2F2',
                  px: 3,
                  '&.Mui-selected, &:hover': {
                    bgcolor: '#03178C',
                    color: '#F2F2F2',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  <item.icon />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary={item.label} />}
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
                          color: '#F2F2F2',
                          pl: 6,
                          '&.Mui-selected, &:hover': {
                            bgcolor: '#03178C',
                            color: '#F2F2F2',
                          },
                        }}
                      >
                        <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                          <child.icon />
                        </ListItemIcon>
                        {sidebarOpen && (
                          <ListItemText primary={child.label} />
                        )}
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
                color: '#F2F2F2',
                px: 3,
                '&.Mui-selected, &:hover': {
                  bgcolor: '#03178C',
                  color: '#F2F2F2',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                <item.icon />
              </ListItemIcon>
              {sidebarOpen && <ListItemText primary={item.label} />}
            </ListItemButton>
          ) : null
        )}
      </List>
    </Paper>
  );
};

export default Sidebar;
