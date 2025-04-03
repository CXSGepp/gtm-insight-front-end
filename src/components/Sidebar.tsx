// src/components/Sidebar.tsx
import {
    Box,
    Button,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Paper
  } from '@mui/material'
  import HomeIcon from '@mui/icons-material/Home'
  import WarehouseIcon from '@mui/icons-material/Warehouse'
  import { Link, useRouter } from '@tanstack/react-router'
  import geppLogo from "../assets/geppLogo.png";

  export default function Sidebar() {
    const router = useRouter()
    const currentPath = router.state.location.pathname
  
    const menuItems = [
      { label: 'Home', icon: <HomeIcon />, path: '/' },
      { label: 'Warehouse', icon: <WarehouseIcon />, path: '/warehouse' },
    ]
  
    return (
      <Box
        sx={{
          p:2
        }}
      >
       
    <Box sx={{ px: 2, py: 2, display: 'flex-center', alignItems: 'center' }}>
       <Paper 
    sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      p: 2 
    }}
  >
    <img
      src={geppLogo}
      alt="GEPP Logo"
      style={{ width: '100%', maxWidth: '120px', height: 'auto' }}
    />
  </Paper>
    </Box>

  
        <Divider sx={{ borderColor: '#2e2e3e', mb: 2 }} />
  
        {/* MENÚ */}
        <List component="nav" disablePadding>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.label}
              component={Link}
              to={item.path}
              selected={currentPath === item.path}
              sx={{
                color: '#c7c7c7',
                px: 3,
                '&.Mui-selected': {
                  bgcolor: '#2A2A3D',
                  color: '#fff',
                },
                '&:hover': {
                  bgcolor: '#2A2A3D',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
  
        {/* FOOTER OPCIONAL */}
        <Box sx={{ mt: 'auto', p: 2 }}>
          <Typography variant="caption" color="gray">
            © 2025 ETM
          </Typography>
        </Box>
      </Box>
    )
  }
  