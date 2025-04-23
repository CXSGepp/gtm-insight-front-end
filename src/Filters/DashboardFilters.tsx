import React from "react";
import {
  
  TextField,
  Button,
  Box,
  Autocomplete,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
} from "@mui/material";
import { useTableStore } from "../store/useTableStore";
import { usePaginatedQuery } from "../hooks/usePaginatedQuery";
import { FilterValue, Filters } from "../shared/types";
import { max } from 'lodash';

const filterKeyMap: Record<string, string> = {
  cliente: "cliente",
  telefonos: "telefonos",
  region: "region",
  zona: "zona",
  bodega: "bodega",
  tiposuta: "tiposruta",
  clasificaciones: "clasificacion",
  sku: "sku",
  bd: "bd",
  estatusOpm: "estatusOpm",
  estatusSio: "estatusSio",
  uopm: "uopm",
  viewmode: "viewMode",
};

type Props = {
  mode: "CLIENT" | "WAREHOUSE";
};

export const DashboardFilters = ({ mode }: Props) => {
  const { filters, setFilters } = useTableStore();
  const { filterOptions, loading } = usePaginatedQuery();
  const [localFilters, setLocalFilters] = React.useState<Filters>({});

  // Handles filter changes
  const handleChange = (field: keyof Filters, value: FilterValue) => {
    console.log("🔄 Changing Field:", field, "Value:", value);
    setLocalFilters((prev) => ({
      ...prev,
      [field]: value !== "" ? value : null,
    }));
  };

  // Handles filter submission (ensures correct API field names)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedFilters: Filters = Object.keys(localFilters).reduce(
      (acc, key) => {
        const normalizedKey = filterKeyMap[key] || key;
        acc[normalizedKey] = localFilters[key as keyof Filters];
        return acc;
      },
      {} as Filters
    );
    console.log("🚀 Sending Filters to API:", JSON.stringify(normalizedFilters, null, 2));
    setFilters(normalizedFilters);
  };

  // Handles clearing filters
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
    skus = [],
    baseDatos = [],
    estatusOpm = [],
    estatusSio = [],
    uopm = [],
  } = filterOptions || {};

  const [viewMode, setViewMode] = React.useState<"CLIENT" | "WAREHOUSE">("CLIENT");

  React.useEffect(() => {
    setViewMode(mode);
  }, [mode]);

  const renderFilter = (
    label: string,
    field: keyof Filters,
    options: (string | number)[],
    isNumber = false
  ) => (

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
        sx={{
          minWidth: 160, 
        }}
      />

  );

  return (
<Paper sx={{ display: "flex", flexDirection: "column", padding: 0, mt: 0, pt: 0 }}>
<Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <ToggleButtonGroup
            color="primary"
            exclusive
            value={viewMode}
            onChange={(_, newValue) => {
              if (newValue !== null) {
                setViewMode(newValue);
              }
            }}
            aria-label="Platform"
          >
            <ToggleButton value="CLIENT">Cliente</ToggleButton>
            <ToggleButton value="WAREHOUSE">Bodega</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {viewMode === "CLIENT" && (
          <Box 
          sx={{
            
            display: "flex",
            flexDirection: "row", // Mostrar horizontalmente
            flexWrap: "wrap", // Permitir salto de línea si no cabe todo
            gap: 2, // Espaciado entre filtros
            mb: 2, // Margen inferior
            minWidth: 160
          }}
          >            {renderFilter("Cliente", "cliente", clientes, true)}
            {renderFilter("Teléfono", "telefonos", telefonos, true)}
            {renderFilter("Región", "region", regiones, true)}
            {renderFilter("Zona", "zona", zonas, true)}
            {renderFilter("Clasificación", "clasificaciones", clasificaciones, true)}
            {renderFilter("Tipo de Ruta", "tiposruta", tiposruta)}
            {renderFilter("Bodega", "bodega", bodegas, true)}
            {renderFilter("SKU", "sku", skus, true)}
            {renderFilter("Base de Datos", "bd", baseDatos, true)}
            {renderFilter("Estatus OPM", "estatusOpm", estatusOpm, true)}
            {renderFilter("Estatus SIO", "estatusSio", estatusSio, true)}
            {renderFilter("UOPM", "uopm", uopm, true)}
          </Box>
        )}

        {viewMode === "WAREHOUSE" && (
          <Box
          sx={{
            display: "flex",
            flexDirection: "row", // Mostrar horizontalmente
            flexWrap: "wrap", // Permitir salto de línea si no cabe todo
            gap: 2, // Espaciado entre filtros
            mb: 2, 
          }}>
            {renderFilter("Bodega", "bodega", bodegas, true)}
            {renderFilter("Tipo de Ruta", "tiposruta", tiposruta, true)}
            {renderFilter("Clasificación", "clasificaciones", clasificaciones, true)}
            {renderFilter("Región", "region", regiones, true)}
            {renderFilter("Zona", "zona", zonas, true)}
            {renderFilter("SKU", "sku", skus, true)}
            {renderFilter("Base de Datos", "bd", baseDatos, true)}
            {renderFilter("Estatus OPM", "estatusOpm", estatusOpm, true)}
            {renderFilter("Estatus SIO", "estatusSio", estatusSio, true)}
            {renderFilter("UOPM", "uopm", uopm)}
          </Box>
        )}

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              Aplicar Filtros
            </Button>
            <Button onClick={handleClear} variant="outlined" color="secondary" disabled={loading}>
              Limpiar Filtros
            </Button>
          </Box>
        
      </Box>
</Paper>
  );
};
