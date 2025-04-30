import { Warehouse } from '@mui/icons-material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';


type NavigationItem = {
  label: string;
  icon: typeof SupportAgentIcon;
  key: string;
  path?: string;
  children?: NavigationItem[];
};

export const navigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    icon: AssessmentIcon,
    key: 'dashboard',
    children: [
      {
        label: 'Clientes',
        icon: SupportAgentIcon,
        path: '/customers',
        key: 'customer',
      },
      {
        label: 'Bodegas',
        icon: Warehouse,
        path: '/warehouse',
        key: 'warehouse',
      },
    ],
  },
];