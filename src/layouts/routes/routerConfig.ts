import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './rootRoute';

export const routes = {
  customer: createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: CustomerMasterDetail,
  }),
  warehouse: createRoute({
    getParentRoute: () => rootRoute,
    path: '/warehouse',
    component: WarehouseMasterDetail,
  }),
  products: createRoute({
    getParentRoute: () => rootRoute,
    path: '/products',
    component: ProductsView,
  })
};

// Navigation config
export const navigationConfig = [
  { 
    label: 'Cliente-Bodega', 
    icon: HomeIcon, 
    route: routes.customer,
    key: 'customer'
  },
  { 
    label: 'Bodega', 
    icon: WarehouseIcon, 
    route: routes.warehouse,
    key: 'warehouse'
  },
  { 
    label: 'Productos', 
    icon: InventoryIcon, 
    route: routes.products,
    key: 'products'
  }
];