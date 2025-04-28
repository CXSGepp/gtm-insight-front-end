import {
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router'

import RootRoute from './__root'
import  CustomerDashboardRoute  from './customer/customerDashboard'
import  WarehouseDashboardRoute  from './warehouse/warehouseDashboard'

const rootRoute = createRootRoute({
  component: RootRoute,
})

const customerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CustomerDashboardRoute,
})

const warehouseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/warehouse',
  component: WarehouseDashboardRoute,
})

const routeTree = rootRoute.addChildren([customerRoute, warehouseRoute])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})
