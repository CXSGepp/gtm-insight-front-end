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
        options={filterOptions.bodegas ?? []}
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
        options={filterOptions.clasificaciones ?? []}
        value={filters.clasificacion ?? ''}
        onChange={(value) => setFilters({ ...filters, clasificacion: value })}
      />
      <FilterInput
        label="Tipo de Ruta"
        type="autocomplete"
        options={filterOptions.tiposRuta ?? []}
        value={filters.tipoRuta ?? ''}
        onChange={(value) => setFilters({ ...filters, tipoRuta: value })}
      />
      <FilterInput
        label="SKU"
        type="text"
        value={filters.sku ?? ''}
        onChange={(value) => setFilters({ ...filters, sku: value })}
      />
      <FilterInput
        label="Origen"
        type="text"
        value={filters.bd ?? ''}
        onChange={(value) => setFilters({ ...filters, bd: value })}
      />
      <FilterInput
        label="Estatus OPM"
        type="text"
        value={filters.estatusOpm ?? ''}
        onChange={(value) => setFilters({ ...filters, estatusOpm: value })}
      />
      <FilterInput
        label="Estatus SIO"
        type="text"
        value={filters.estatusSio ?? ''}
        onChange={(value) => setFilters({ ...filters, estatusSio: value })}
      />
      <FilterInput
        label="Fecha de Registro"
        type="text" // podrías cambiar a date-picker si usas MUI X
        value={filters.fechaRegistro ?? ''}
        onChange={(value) => setFilters({ ...filters, fechaRegistro: value })}
      />
    </FilterContainer>
  );
}
