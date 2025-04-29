import React from 'react';
import FilterContainer from '../../../shared/components/filters/filter-container/FilterContainer';
import FilterInput from '../../../shared/components/filters/filter-input/FilterInput';
import { useWarehouseTableStore } from '../store/warehouseTableStore';
import { usePaginatedWarehouseQuery } from '../hooks/usePaginatedWarehouseQuery';
import WarehouseFiltersSkeleton from './WarehouseFiltersSkeleton';
import { Grid } from '@mui/material';

export default function WarehouseFilters() {
  const { filters, setFilters, resetFilters } = useWarehouseTableStore();
  const { filterOptions, loading } = usePaginatedWarehouseQuery();

  if (!filterOptions || loading) {
    return <WarehouseFiltersSkeleton />;
  }

  return (
    <FilterContainer onApply={() => setFilters(filters)} onReset={resetFilters}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <FilterInput
            label="Bodega"
            type="autocomplete"
            freeSolo
            options={filterOptions.bodegas ?? []}
            value={filters.bodega ?? ''}
            onChange={(value) => setFilters({ ...filters, bodega: value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FilterInput
            label="Zona"
            type="autocomplete"
            freeSolo
            options={filterOptions.zonas ?? []}
            value={filters.zona ?? ''}
            onChange={(value) => setFilters({ ...filters, zona: value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FilterInput
            label="Región"
            type="autocomplete"
            freeSolo
            options={filterOptions.regiones ?? []}
            value={filters.region ?? ''}
            onChange={(value) => setFilters({ ...filters, region: value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FilterInput
            label="Clasificación"
            type="autocomplete"
            freeSolo
            options={filterOptions.clasificaciones ?? []}
            value={filters.clasificacion ?? ''}
            onChange={(value) => setFilters({ ...filters, clasificacion: value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FilterInput
            label="Tipo de Ruta"
            type="autocomplete"
            freeSolo
            options={filterOptions.tiposRuta ?? []}
            value={filters.tipoRuta ?? ''}
            onChange={(value) => setFilters({ ...filters, tipoRuta: value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FilterInput
            label="SKU"
            type="autocomplete"
            freeSolo
            options={filterOptions.skus ?? []}
            value={filters.sku ?? ''}
            onChange={(value) => setFilters({ ...filters, sku: value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FilterInput
            label="Origen"
            type="autocomplete"
            freeSolo
            options={filterOptions.bds ?? []}
            value={filters.bd ?? ''}
            onChange={(value) => setFilters({ ...filters, bd: value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FilterInput
            label="Estatus OPM"
            type="autocomplete"
            freeSolo
            options={filterOptions.estatusOpm ?? []}
            value={filters.estatusOpm ?? ''}
            onChange={(value) => setFilters({ ...filters, estatusOpm: value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FilterInput
            label="Estatus SIO"
            type="autocomplete"
            freeSolo
            options={filterOptions.estatusSio ?? []}
            value={filters.estatusSio ?? ''}
            onChange={(value) => setFilters({ ...filters, estatusSio: value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FilterInput
            label="Fecha de Registro"
            type="autocomplete"
            freeSolo
            options={filterOptions.fechas ?? []}
            value={filters.fechaRegistro ?? ''}
            onChange={(value) => setFilters({ ...filters, fechaRegistro: value })}
          />
        </Grid>
      </Grid>
    </FilterContainer>
  );
}
