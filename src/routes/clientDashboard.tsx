import React from 'react'
import Dashboard from '../pages/Dashboard'
import { Paper } from '@mui/material'


export default function ClientDashboardRoute() {
  return (
  <Paper sx={{ width: "80%" }}>

      <Dashboard mode="CLIENT" />

    </Paper>
  )
}
