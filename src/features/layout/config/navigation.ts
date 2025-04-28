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
        label: 'Cliente',
        icon: SupportAgentIcon,
        key: 'customer'
      },
      {
        label: 'Bodega',
        icon: Warehouse,
        path:'/warehouse',
        key: 'warehouse'
      }
    ]
  } 
];