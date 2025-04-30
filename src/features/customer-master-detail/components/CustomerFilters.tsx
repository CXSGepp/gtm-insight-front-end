import React from 'react';
import FilterContainer from '../../../shared/components/filters/filter-container/FilterContainer';
import FilterInput from '../../../shared/components/filters/filter-input/FilterInput';
import { useCustomerTableStore } from '../store/customerTableStore';
import { usePaginatedCustomerQuery } from '../hooks/usePaginatedCustomerQuery';
import CustomersFiltersSkeleton from './CustomerFiltersSkeleton';

export default function CustomerFilters() {
  const { filters, setFilters, resetFilters } = useCustomerTableStore();

const { filterOptions, loading } = usePaginatedCustomerQuery();

    if (!filterOptions || loading) {
      return <CustomersFiltersSkeleton />;
    }

  return (
    <FilterContainer onApply={() => setFilters(filters)} onReset={resetFilters}>
      <FilterInput
        label="Cliente"
        type="autocomplete"
        freeSolo
        options={filterOptions.clientes?.filter((v, i, a) => v !== null && v !== '' && a.indexOf(v) === i) || []}
        value={filters.cliente || ''}
        onChange={(value) => setFilters({ ...filters, cliente: value })}
      />
      <FilterInput
        label="Teléfonos"
        type="autocomplete"
        freeSolo
        options={filterOptions.telefonos?.filter((v, i, a) => v !== null && v !== '' && a.indexOf(v) === i) || []}
        value={filters.telefono || ''}
        onChange={(value) => setFilters({ ...filters, telefono: value })}
      />
      <FilterInput
        label="Región"
        type="autocomplete"
        freeSolo
        options={filterOptions.regiones?.filter((v, i, a) => v !== null && v !== '' && a.indexOf(v) === i) || []}
        value={filters.region || ''}
        onChange={(value) => setFilters({ ...filters, region: value })}
      />
      <FilterInput
        label="Zona"
        type="autocomplete"
        freeSolo
        options={filterOptions.zonas?.filter((v, i, a) => v !== null && v !== '' && a.indexOf(v) === i) || []}
        value={filters.zona || ''}
        onChange={(value) => setFilters({ ...filters, zona: value })}
      />
      <FilterInput
        label="Clasificación"
        type="autocomplete"
        freeSolo
        options={filterOptions.clasificaciones?.filter((v, i, a) => v !== null && v !== '' && a.indexOf(v) === i) || []}
        value={filters.clasificacion || ''}
        onChange={(value) => setFilters({ ...filters, clasificacion: value })}
      />
      <FilterInput
        label="Tipo Ruta"
        type="autocomplete"
        freeSolo
        options={filterOptions.tiposRuta?.filter((v, i, a) => v !== null && v !== '' && a.indexOf(v) === i) || []}
        value={filters.tipoRuta || ''}
        onChange={(value) => setFilters({ ...filters, tipoRuta: value })}
      />
      <FilterInput
        label="Bodega"
        type="autocomplete"
        freeSolo
        options={filterOptions.bodegas?.filter((v, i, a) => v !== null && v !== '' && a.indexOf(v) === i) || []}
        value={filters.bodega || ''}
        onChange={(value) => setFilters({ ...filters, bodega: value })}
      />
    </FilterContainer>
  );
}
