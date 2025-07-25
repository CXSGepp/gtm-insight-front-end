import {
  createRouter,
  createRoute,
  createRootRoute,
  Navigate,                
} from '@tanstack/react-router';

import RootRoute from './__root';
import CustomerDashboardRoute from './customer/customerDashboard';
import WarehouseDashboardRoute from './warehouse/warehouseDashboard';

/* ---------- raíz ---------- */
const rootRoute = createRootRoute({
  component: RootRoute,
});

/* ---------- rutas de features ---------- */
const customerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'getm_insight/customers',                
  component: CustomerDashboardRoute,
});

const warehouseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'getm_insight/warehouse',
  component: WarehouseDashboardRoute,
});
const IndexRedirect: React.FC = () => <Navigate to="/getm_insight/customers" replace />;


/* ---------- index redirect ---------- */
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/getm_insight',                         
  component: IndexRedirect,
});

/* ---------- árbol ---------- */
const routeTree = rootRoute.addChildren([
  indexRoute,
  customerRoute,
  warehouseRoute,
]);

/* ---------- router ---------- */
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});
