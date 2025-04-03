import React from "react";
import { DashboardFilters } from "../Filters/DashboardFilters";
import DataTable from "../components/Layout/table/DataTable";
import { Typography, Box, Paper } from '@mui/material';
import { useTableStore } from "../store/useTableStore";
import Sidebar from "../components/Sidebar";


type Props = {
  mode: 'CLIENT' | 'WAREHOUSE'
 }

export default function Dashboard({ mode }: Props) {
  const { setFilters } = useTableStore()

  React.useEffect(() => {
    console.log("Dashboard mounted with mode:", mode)
    setFilters({ viewMode: mode })
  }, [mode, setFilters])

  return (
    

  <Paper
    sx={{
      maxWidth: '1400px',
      width: '100%',
      minHeight: '100vh',
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',  
      gap: 2,
      boxShadow: 3,
      bgcolor: 'background.paper',
    }}
  >
    
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        Reporte GETM
      </Typography>
    </Box>
      <DashboardFilters />
      <DataTable />
    </Paper>

    );
  
}
