import {
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router'

import RootRoute from './__root'
import  ClientDashboardRoute  from './clientDashboard'
import  WarehouseDashboardRoute  from './warehouseDashboard'

const rootRoute = createRootRoute({
  component: RootRoute,
})

const clientRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ClientDashboardRoute,
})

const warehouseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/warehouse',
  component: WarehouseDashboardRoute,
})

const routeTree = rootRoute.addChildren([clientRoute, warehouseRoute])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})
