import React from 'react';
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
      <FilterInput
        label="Clasificación"
        type="autocomplete"
        options={filterOptions.clasi ?? []}
        value={filters.region ?? ''}
        onChange={(value) => setFilters({ ...filters, region: value })}
      />
      <FilterInput
        label="SKU"
        type="autocomplete"
        options={filterOptions.regiones ?? []}
        value={filters.region ?? ''}
        onChange={(value) => setFilters({ ...filters, region: value })}
      />
      <FilterInput
        label="ORIGEN"
        type="autocomplete"
        options={filterOptions.regiones ?? []}
        value={filters.region ?? ''}
        onChange={(value) => setFilters({ ...filters, region: value })}
      />
      <FilterInput
        label="Región"
        type="autocomplete"
        options={filterOptions.regiones ?? []}
        value={filters.region ?? ''}
        onChange={(value) => setFilters({ ...filters, region: value })}
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
