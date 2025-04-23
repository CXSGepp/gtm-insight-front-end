import React from "react";
import { DashboardFilters } from "../Filters/DashboardFilters";
import DataTable from "../components/Layout/table/DataTable";
import { useTableStore } from "../store/useTableStore";
import { Box, Paper } from "@mui/material";


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
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      width: "100%",
      mt: 4, // Margen superior opcional
    }}
  >
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "1200px", // Máximo ancho del contenido
        px: 4,
        py: 2,
      }}
    >
      <DashboardFilters mode={mode} />
      <DataTable />
    </Paper>
  </Box>
  
  );
  
}
