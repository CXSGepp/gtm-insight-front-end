import {
  createRouter,
  createRoute,
  createRootRoute,
  Navigate,                // 👈 importa el helper
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
  path: '/customers',                 // 🌟 ruta propia
  component: CustomerDashboardRoute,
});

const warehouseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/warehouse',
  component: WarehouseDashboardRoute,
});
const IndexRedirect: React.FC = () => <Navigate to="/customers" replace />;

/* ---------- index redirect ---------- */
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',                          // URL “/”
  component: IndexRedirect, // ⬅️ redirige
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
