import React from 'react';
import FilterContainer from '../../../shared/components/filters/filter-container/FilterContainer';
import  FilterInput  from '../../../shared/components/filters/filter-input/FilterInput';
import { useCustomerTableStore } from '../store/customerTableStore';
import { usePaginatedCustomerQuery } from '../hooks/usePaginatedCustomerQuery';

export default function CustomerFilters() {
  const { filters, setFilters, resetFilters } = useCustomerTableStore();
  const { filterOptions } = usePaginatedCustomerQuery();

  return (
    <FilterContainer
      onApply={() => setFilters(filters)}
      onReset={resetFilters}
    >
      <FilterInput
        label="Cliente"
        type="autocomplete"
        options={filterOptions.clientes || []}
        value={filters.cliente || ''}
        onChange={(value) => setFilters({ ...filters, cliente: value })}
      />
      <FilterInput
        label="Teléfonos"
        type="autocomplete"
        options={filterOptions.telefonos || []}
        value={filters.telefono || ''}
        onChange={(value) => setFilters({ ...filters, telefono: value })}
      />
      <FilterInput
        label="Región"
        type="autocomplete"
        options={filterOptions.regiones || []}
        value={filters.region || ''}
        onChange={(value) => setFilters({ ...filters, region: value })}
      />
      <FilterInput
        label="Zona"
        type="autocomplete"
        options={filterOptions.zonas || []}
        value={filters.zona || ''}
        onChange={(value) => setFilters({ ...filters, zona: value })}
      />
      <FilterInput
        label="Clasificación"
        type="autocomplete"
        options={filterOptions.clasificaciones || []}
        value={filters.clasificacion || ''}
        onChange={(value) => setFilters({ ...filters, clasificacion: value })}
      />
      <FilterInput
        label="Tipo Ruta"
        type="autocomplete"
        options={filterOptions.tiposruta || []}
        value={filters.tiposruta || ''}
        onChange={(value) => setFilters({ ...filters, tiposruta: value })}
      />
      <FilterInput
        label="Bodega"
        type="autocomplete"
        options={filterOptions.bodegas || []}
        value={filters.bodega || ''}
        onChange={(value) => setFilters({ ...filters, bodega: value })}
      />
    </FilterContainer>
  );
}
