// src/layouts/components/base/Sidebar.tsx
import { useRouter, Link } from '@tanstack/react-router';
import { navigationConfig } from '../../routes/routeConfig';
import { useLayoutStore } from '../../store/layoutStore';

export const Sidebar = () => {
  const router = useRouter();
  const { sidebarOpen } = useLayoutStore();
  
  const isRouteActive = (path: string) => {
    return router.state.location.pathname.startsWith(path);
  };

  return (
    <Paper
      sx={{
        p: 2,
        backgroundColor: '#010326',
        width: sidebarOpen ? 250 : 70,
        transition: 'width 0.3s ease',
      }}
    >
      <Box sx={{ px: 2, py: 2, display: 'flex', justifyContent: 'center' }}>
        <img
          src={geppLogo}
          alt="GEPP Logo"
          style={{
            width: sidebarOpen ? '120px' : '40px',
            height: 'auto',
            transition: 'width 0.3s ease'
          }}
        />
      </Box>

      <Divider sx={{ borderColor: '#03178C', mb: 2 }} />

      <List component="nav" disablePadding>
        {navigationConfig.map(({ label, icon: Icon, route, key }) => (
          <ListItemButton
            key={key}
            component={Link}
            to={route.path}
            selected={isRouteActive(route.path)}
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
              <Icon />
            </ListItemIcon>
            {sidebarOpen && <ListItemText primary={label} />}
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};