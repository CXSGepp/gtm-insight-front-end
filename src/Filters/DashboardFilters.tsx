import React from "react";
import {
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  Autocomplete,
} from "@mui/material";
import { useTableStore } from "../store/useTableStore";
import { usePaginatedQuery } from "../hooks/usePaginatedQuery";

// ✅ Ensure filter keys match API expectations
const filterKeyMap: Record<string, string> = {
  cliente: "cliente",
  telefonos: "telefonos",
  region: "region",
  zona: "zona",
  bodega: "bodega",
  tiposruta: "tiposruta", 
  clasificaciones: "clasificacion", 
};

type FilterValue = string | number | null;
type Filters = Record<string, FilterValue>;

export const DashboardFilters = () => {
  const { filters, setFilters } = useTableStore();
  const { filterOptions, loading } = usePaginatedQuery();
  const [localFilters, setLocalFilters] = React.useState<Filters>({});

  // 📌 Handles filter changes
  const handleChange = (field: keyof Filters, value: FilterValue) => {
    console.log("🔄 Changing Field:", field, "Value:", value);

    setLocalFilters((prev) => ({
      ...prev,
      [field]: value !== "" ? value : null,
    }));
  };

  // 📌 Handles filter submission (ensures correct API field names)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔥 Transform filter keys before sending them
    const normalizedFilters: Filters = Object.keys(localFilters).reduce((acc, key) => {
      const normalizedKey = filterKeyMap[key] || key; // Use correct API key
      acc[normalizedKey] = localFilters[key as keyof Filters];
      return acc;
    }, {} as Filters);

    console.log("🚀 Sending Filters to API:", JSON.stringify(normalizedFilters, null, 2));
    setFilters(normalizedFilters);
  };

  // 📌 Handles clearing filters
  const handleClear = () => {
    setLocalFilters({});
    setFilters({});
  };

  React.useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const {
    clientes = [],
    telefonos = [],
    regiones = [],
    zonas = [],
    bodegas = [],
    tiposruta = [], 
    clasificaciones = [], 
  } = filterOptions || {};

  // ✅ Handles rendering each filter dynamically
  const renderFilter = (
    label: string,
    field: keyof Filters,
    options: (string | number)[],
    isNumber = false
  ) => (
    <Grid item xs={12} sm={6} md={3} key={field}>
      <Autocomplete
        options={options.length > 0 ? options.map(String) : []}
        value={
          localFilters[field] !== null && localFilters[field] !== undefined
            ? String(localFilters[field])
            : null
        }
        onChange={(_, newValue) => handleChange(field, newValue)}
        getOptionLabel={(option) => (isNumber ? String(option) : option)}
        renderInput={(params) => <TextField {...params} label={label} fullWidth />}
        loading={loading}
        loadingText="Cargando..."
        noOptionsText="Sin opciones"
      />
    </Grid>
  );

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Filtros</Typography>
          </Grid>

          {/* Filters */}
          {renderFilter("Cliente", "cliente", clientes, true)}
          {renderFilter("Teléfono", "telefonos", telefonos, true)}
          {renderFilter("Región", "region", regiones)}
          {renderFilter("Zona", "zona", zonas)}
          {renderFilter("Bodega", "bodega", bodegas, true)}
          {renderFilter("Tipo de Ruta", " tiposruta",  tiposruta)}
          {renderFilter("Clasificación", "clasificaciones", clasificaciones)}

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                Aplicar Filtros
              </Button>
              <Button onClick={handleClear} variant="outlined" color="secondary" disabled={loading}>
                Limpiar Filtros
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
