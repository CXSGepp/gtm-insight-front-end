import React from 'react'
import { Outlet } from '@tanstack/react-router'
import App from '../App'

export default function RootRoute() {
  return (
    <App>
    <Outlet />
  </App>
  )
}
