import { Home, Warehouse } from '@mui/icons-material';



export const navigationItems = [
  {
    label: 'Cliente-Bodega',
    icon: Home,
    path: '/',
    key: 'customer'
  },
  {
    label: 'Bodega',
    icon: Warehouse,
    path: '/warehouse',
    key: 'warehouse'
  }
];