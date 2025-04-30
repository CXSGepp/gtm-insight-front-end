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
  
          <FilterInput
            label="Bodega"
            type="autocomplete"
            options={(filterOptions.bodegas ?? []).map((bodega) => ({
              label: String(bodega),
              value: bodega,
            }))}
            value={filters.bodega ?? ''}
            onChange={(value) => setFilters({ ...filters, bodega: value })}
          />
    

          <FilterInput
            label="Zona"
            type="autocomplete"
            options={(filterOptions.zonas ?? []).map((zona) => ({
              label: String(zona),
              value: zona,
            }))}
            value={filters.zona ?? ''}
            onChange={(value) => setFilters({ ...filters, zona: value })}
          />
  

          <FilterInput
            label="Región"
            type="autocomplete"
            options={(filterOptions.regiones ?? []).map((region) => ({
              label: String(region),
              value: region,
            }))}
            value={filters.region ?? ''}
            onChange={(value) => setFilters({ ...filters, region: value })}
          />

          <FilterInput
            label="Clasificación"
            type="autocomplete"
            options={(filterOptions.clasificaciones ?? []).map((clasificacion) => ({
              label: String(clasificacion),
              value: clasificacion,
            }))}
            value={filters.clasificacion ?? ''}
            onChange={(value) => setFilters({ ...filters, clasificacion: value })}
          />

        {/* Add more filters similarly here */}
    </FilterContainer>
  );
}
