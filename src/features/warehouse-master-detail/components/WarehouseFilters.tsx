import React from 'react';
import { Grid } from '@mui/material';
import FilterContainer from '../../../shared/components/filters/filter-container/FilterContainer';
import FilterInput from '../../../shared/components/filters/filter-input/FilterInput';
import { useWarehouseTableStore } from '../store/warehouseTableStore';
import { usePaginatedWarehouseQuery } from '../hooks/usePaginatedWarehouseQuery';
import WarehouseFiltersSkeleton from './WarehouseFiltersSkeleton';

export default function WarehouseFilters() {
  const { filters, setFilters, resetFilters } = useWarehouseTableStore();
  const { filterOptions, loading } = usePaginatedWarehouseQuery();

  if (!filterOptions || loading) {
    return <WarehouseFiltersSkeleton />;
  }

  return (
    <FilterContainer
      onApply={() => setFilters(filters)}
      onReset={resetFilters}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <FilterInput
            label="Bodega"
            type="autocomplete"
            options={filterOptions.bodegas ?? []}
            value={filters.bodega ?? ''}
            onChange={(value) => setFilters({ ...filters, bodega: value })}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FilterInput
            label="Zona"
            type="autocomplete"
            options={filterOptions.zonas ?? []}
            value={filters.zona ?? ''}
            onChange={(value) => setFilters({ ...filters, zona: value })}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FilterInput
            label="Región"
            type="autocomplete"
            options={filterOptions.regiones ?? []}
            value={filters.region ?? ''}
            onChange={(value) => setFilters({ ...filters, region: value })}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FilterInput
            label="Clasificación"
            type="autocomplete"
            options={filterOptions.clasificaciones ?? []}
            value={filters.clasificacion ?? ''}
            onChange={(value) => setFilters({ ...filters, clasificacion: value })}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FilterInput
            label="Tipo de Ruta"
            type="autocomplete"
            options={filterOptions.tiposRuta ?? []}
            value={filters.tipoRuta ?? ''}
            onChange={(value) => setFilters({ ...filters, tipoRuta: value })}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FilterInput
            label="SKU"
            type="text"
            value={filters.sku ?? ''}
            onChange={(value) => setFilters({ ...filters, sku: value })}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FilterInput
            label="Origen"
            type="text"
            value={filters.origen ?? ''}
            onChange={(value) => setFilters({ ...filters, origen: value })}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FilterInput
            label="Estatus OPM"
            type="text"
            value={filters.estatusOpm ?? ''}
            onChange={(value) => setFilters({ ...filters, estatusOpm: value })}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FilterInput
            label="Estatus SIO"
            type="text"
            value={filters.estatusSio ?? ''}
            onChange={(value) => setFilters({ ...filters, estatusSio: value })}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FilterInput
            label="Fecha de Registro"
            type="date"
            value={filters.fechaRegistro ?? ''}
            onChange={(value) => setFilters({ ...filters, fechaRegistro: value })}
          />
        </Grid>
      </Grid>
    </FilterContainer>
  );
}
