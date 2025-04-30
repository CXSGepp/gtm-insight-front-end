// src/features/warehouse-master-detail/components/WarehouseFilters.tsx
import React from 'react';
import FilterContainer from '../../../shared/components/filters/filter-container/FilterContainer';
import FilterInput from '../../../shared/components/filters/filter-input/FilterInput';
import { useWarehouseTableStore } from '../store/warehouseTableStore';
import { usePaginatedWarehouseQuery } from '../hooks/usePaginatedWarehouseQuery';
import WarehouseFiltersSkeleton from './WarehouseFiltersSkeleton';

export default function WarehouseFilters() {
  const { setFilters, resetFilters } = useWarehouseTableStore();
  const { filterOptions, loading } = usePaginatedWarehouseQuery();

  if (!filterOptions || loading) {
    return <WarehouseFiltersSkeleton />;
  }

  return (
    <FilterContainer
      onApply={(localFilters) => setFilters(localFilters)}
      onReset={resetFilters}
    >
      {({ localFilters, setLocalFilters }) => (
        <>
          <FilterInput
            label="Bodega"
            type="autocomplete"
            options={(filterOptions.bodegas ?? []).map((bodega) => ({
              label: String(bodega),
              value: bodega,
            }))}
            value={localFilters.bodega ?? ''}
            onChange={(value) => setLocalFilters((prev) => ({ ...prev, bodega: value }))}
          />

          <FilterInput
            label="Zona"
            type="autocomplete"
            options={(filterOptions.zonas ?? []).map((zona) => ({
              label: String(zona),
              value: zona,
            }))}
            value={localFilters.zona ?? ''}
            onChange={(value) => setLocalFilters((prev) => ({ ...prev, zona: value }))}
          />

          <FilterInput
            label="Región"
            type="autocomplete"
            options={(filterOptions.regiones ?? []).map((region) => ({
              label: String(region),
              value: region,
            }))}
            value={localFilters.region ?? ''}
            onChange={(value) => setLocalFilters((prev) => ({ ...prev, region: value }))}
          />

          <FilterInput
            label="Clasificación"
            type="autocomplete"
            options={(filterOptions.clasificaciones ?? []).map((clasificacion) => ({
              label: String(clasificacion),
              value: clasificacion,
            }))}
            value={localFilters.clasificacion ?? ''}
            onChange={(value) => setLocalFilters((prev) => ({ ...prev, clasificacion: value }))}
          />
        </>
      )}
    </FilterContainer>
  );
}
