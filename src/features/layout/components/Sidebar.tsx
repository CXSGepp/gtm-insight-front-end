import { Link, useRouter } from '@tanstack/react-router';
import { navigationItems } from '../config/navigation';
import { useLayoutStore } from '../store/useLayoutStore';

export const Sidebar = () => {
  const router = useRouter();
  const { sidebarOpen } = useLayoutStore();

  const isRouteActive = (path: string) => {
    return router.state.location.pathname === path;
  };

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
            transition: 'width 0.3s ease'
          }}
        />
      </Box>

      <Divider sx={{ borderColor: '#03178C', mb: 2 }} />

      <List component="nav" disablePadding>
        {navigationItems.map(({ label, icon: Icon, path, key }) => (
          <ListItemButton
            key={key}
            component={Link}
            to={path}
            selected={isRouteActive(path)}
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