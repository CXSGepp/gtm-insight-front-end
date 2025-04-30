import { Warehouse } from '@mui/icons-material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export const navigationItems = [
  {
    label: 'Dashboard',
    icon: AssessmentIcon,
    key: 'dashboard',
    children: [
      {
        label: 'Clientes',
        icon: SupportAgentIcon,
        path: '/customer',
        key: 'customer'
      },
      {
        label: 'Bodegas',
        icon: Warehouse,
        path:'/warehouse',
        key: 'warehouse'
      }
    ]
  } 
];