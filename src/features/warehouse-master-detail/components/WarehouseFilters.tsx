import React from 'react';
import FilterContainer from '../../../shared/components/filters/filter-container/FilterContainer';
import FilterInput from '../../../shared/components/filters/filter-input/FilterInput'; 
import { useWarehouseTableStore } from '../store/warehouseTableStore';
import { usePaginatedWarehouseQuery } from '../hooks/usePaginatedWarehouseQuery';

export default function WarehouseFilters() {
  const { filters, setFilters, resetFilters } = useWarehouseTableStore();
  const { filterOptions, loading } = usePaginatedWarehouseQuery();

  if (loading || !filterOptions) {
    return <div>Loading filters...</div>;   // 🔥 Aquí protegemos
  }

  return (
    <FilterContainer
      onApply={() => setFilters(filters)}
      onReset={resetFilters}
    >
      <FilterInput
        label="Bodega"
        type="autocomplete"
        options={filterOptions.bodegas ?? []} // 🔥 protección extra
        value={filters.bodega ?? ''}
        onChange={(value) => setFilters({ ...filters, bodega: value })}
      />
      <FilterInput
        label="Zona"
        type="autocomplete"
        options={filterOptions.zonas ?? []}
        value={filters.zona ?? ''}
        onChange={(value) => setFilters({ ...filters, zona: value })}
      />
      <FilterInput
        label="Región"
        type="autocomplete"
        options={filterOptions.regiones ?? []}
        value={filters.region ?? ''}
        onChange={(value) => setFilters({ ...filters, region: value })}
      />
      {/* Otros filtros aquí si necesitas */}
    </FilterContainer>
  );
}
