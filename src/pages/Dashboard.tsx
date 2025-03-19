import React from "react";
import { DashboardFilters } from "../Filters/DashboardFilters";
import DataTable from "../components/Layout/table/DataTable";
import { Typography, Box } from '@mui/material';
import logoGepp from "../assets/GEPP_Logo_fondo_blanco.png"; // Import the image

export default function Dashboard() {
  return (

    <div className="p-4">
          <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="h4" >Reporte GEPP En Tus Manos</Typography>
      <img src={logoGepp} alt="GEPP Logo" style={{ height: "100px" }} />
    </Box>
      <DashboardFilters />
      <DataTable />
    </div>
  );
}
