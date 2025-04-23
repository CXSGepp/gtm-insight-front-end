import {
    Box,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,

    Paper
  } from '@mui/material'
  import HomeIcon from '@mui/icons-material/Home'
  import WarehouseIcon from '@mui/icons-material/Warehouse'
  import { Link, useRouter } from '@tanstack/react-router'
  import geppLogo from '../../../assets/geppLogo.png';

  export default function Sidebar() {
    const router = useRouter()
    const currentPath = router.state.location.pathname
  
    const menuItems = [
      { label: 'Home', icon: <HomeIcon />, path: '/' },
      { label: 'Warehouse', icon: <WarehouseIcon />, path: '/warehouse' },
    ]
  
    return (
      <Paper
        sx={{
          p:2,
          backgroundColor: '#010326',
          maxWidth: '250px',
        }}
      >
       
    <Box sx={{ px: 2, py: 2, display: 'flex-center', alignItems: 'center' }}>
    <img
      src={geppLogo}
      alt="GEPP Logo"
      style={{ width: '100%', maxWidth: '120px', height: 'auto' }}
    />

    </Box>

  
        <Divider sx={{ borderColor: '#03178C', mb: 2 }} />
  

        <List component="nav" disablePadding>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.label}
              component={Link}
              to={item.path}
              selected={currentPath === item.path}
              sx={{
                color: '#F2F2F2',
                px: 3,
                '&.Mui-selected': {
                  bgcolor: '#03178C',
                  color: '#F2F2F2',
                },
                '&:hover': {
                  bgcolor: '#0903A6',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
  
        
        </Paper>
    )
  }
  