import React from "react";
import {
  Paper,
  TextField,
  Button,
  Box,
  Autocomplete,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useTableStore } from "../store/useTableStore";
import { usePaginatedQuery } from "../hooks/usePaginatedQuery";
// Importamos los tipos comunes
import { FilterValue, Filters } from "../shared/types";

const filterKeyMap: Record<string, string> = {
  cliente: "cliente",
  telefonos: "telefonos",
  region: "region",
  zona: "zona",
  bodega: "bodega",
  tiposruta: "tiposruta",
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

  // Destructuramos todas las opciones, incluyendo las nuevas
  const {
    clientes = [],
    telefonos = [],
    regiones = [],
    zonas = [],
    bodegas = [],
    tiposRuta = [],
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
    <Box sx={{ width: "100%", maxWidth: 250 }} key={field}>
      <Autocomplete
        // Puedes descomentar freeSolo si quieres permitir entrada libre
        // freeSolo
        size="small"
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
    </Box>
  );

  return (
    <Paper sx={{ p: 4, mb: 4 }}>
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
          <div className="flex flex-wrap gap-6 p-6">
            {renderFilter("Cliente", "cliente", clientes, true)}
            {renderFilter("Teléfono", "telefonos", telefonos, true)}
            {renderFilter("Región", "region", regiones, true)}
            {renderFilter("Zona", "zona", zonas, true)}
            {renderFilter("Clasificación", "clasificaciones", clasificaciones, true)}
            {renderFilter("Tipo de Ruta", "tiposruta", tiposRuta)}
            {renderFilter("Bodega", "bodega", bodegas, true)}
            {renderFilter("SKU", "sku", skus, true)}
            {renderFilter("Base de Datos", "bd", baseDatos, true)}
            {renderFilter("Estatus OPM", "estatusOpm", estatusOpm, true)}
            {renderFilter("Estatus SIO", "estatusSio", estatusSio, true)}
            {renderFilter("UOPM", "uopm", uopm, true)}
          </div>
        )}

        {viewMode === "WAREHOUSE" && (
          <div className="flex flex-wrap gap-6 p-6">
            {renderFilter("Bodega", "bodega", bodegas, true)}
            {renderFilter("Tipo de Ruta", "tiposruta", tiposRuta, true)}
            {renderFilter("Clasificación", "clasificaciones", clasificaciones, true)}
            {renderFilter("Región", "region", regiones, true)}
            {renderFilter("Zona", "zona", zonas, true)}
            {renderFilter("SKU", "sku", skus, true)}
            {renderFilter("Base de Datos", "bd", baseDatos, true)}
            {renderFilter("Estatus OPM", "estatusOpm", estatusOpm, true)}
            {renderFilter("Estatus SIO", "estatusSio", estatusSio, true)}
            {renderFilter("UOPM", "uopm", uopm)}
          </div>
        )}

        <Paper sx={{ p: 2, mt: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              Aplicar Filtros
            </Button>
            <Button onClick={handleClear} variant="outlined" color="secondary" disabled={loading}>
              Limpiar Filtros
            </Button>
          </Box>
        </Paper>
      </Box>
    </Paper>
  );
};
