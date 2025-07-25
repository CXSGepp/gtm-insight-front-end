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
    label: 'Dashboards',
    icon: AssessmentIcon,
    key: 'dashboard',
    children: [
      {
        label: 'Clientes',
        icon: SupportAgentIcon,
        path: '/getm_insight/customers',
        key: 'customer',
      },
      {
        label: 'Bodegas',
        icon: Warehouse,
        path: '/getm_insight/warehouse',
        key: 'warehouse',
      },
    ],
  },
];