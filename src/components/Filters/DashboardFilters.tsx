import React, { useState, useEffect } from "react";
import { Paper, Grid, TextField, Button, Box, Autocomplete } from "@mui/material";
import { useDashboardStore } from "../../store/DashboardStore";
import { useDashboardData } from "../../hooks/useDashboardData";

export const DashboardFilters = () => {
  const { filters, setFilters, clearFilters } = useDashboardStore();
  const { data, loading } = useDashboardData();
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Sacamos opciones únicas de la data (sea caché o BD)
  const options = React.useMemo(() => {
    const uniqueValues = {
      REGION: new Set<string>(),
      ZONA: new Set<string>(),
      TIPO_RUTA: new Set<string>(),
      CLASIFICACION: new Set<string>(),
    };
    data.forEach((item) => {
      if (item.REGION) uniqueValues.REGION.add(item.REGION);
      if (item.ZONA) uniqueValues.ZONA.add(item.ZONA);
      if (item.TIPO_RUTA) uniqueValues.TIPO_RUTA.add(item.TIPO_RUTA);
      if (item.CLASIFICACION) uniqueValues.CLASIFICACION.add(item.CLASIFICACION);
    });

    return {
      REGION: Array.from(uniqueValues.REGION),
      ZONA: Array.from(uniqueValues.ZONA),
      TIPO_RUTA: Array.from(uniqueValues.TIPO_RUTA),
      CLASIFICACION: Array.from(uniqueValues.CLASIFICACION),
    };
  }, [data]);

  const handleApplyFilters = () => {
    setFilters(localFilters);
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Cliente"
            type="number"
            value={localFilters.CLIENTE || ""}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, CLIENTE: Number(e.target.value) })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Autocomplete
            options={options.REGION}
            value={localFilters.REGION || null}
            onChange={(_, newValue) => setLocalFilters({ ...localFilters, REGION: newValue })}
            renderInput={(params) => <TextField {...params} label="Región" fullWidth />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Autocomplete
            options={options.ZONA}
            value={localFilters.ZONA || null}
            onChange={(_, newValue) => setLocalFilters({ ...localFilters, ZONA: newValue })}
            renderInput={(params) => <TextField {...params} label="Zona" fullWidth />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Autocomplete
            options={options.TIPO_RUTA}
            value={localFilters.TIPO_RUTA || null}
            onChange={(_, newValue) => setLocalFilters({ ...localFilters, TIPO_RUTA: newValue })}
            renderInput={(params) => <TextField {...params} label="Tipo Ruta" fullWidth />}
          />
        </Grid>

        {/* Botones de acción */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button onClick={handleApplyFilters} variant="contained" color="primary">
              Aplicar Filtros
            </Button>
            <Button onClick={clearFilters} variant="outlined" color="secondary">
              Limpiar Filtros
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
