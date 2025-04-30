// src/features/customer-master-detail/components/CustomerFilters.tsx
import React from 'react';
import FilterContainer from '../../../shared/components/filters/filter-container/FilterContainer';
import FilterInput from '../../../shared/components/filters/filter-input/FilterInput';
import { useCustomerTableStore } from '../store/customerTableStore';
import { usePaginatedCustomerQuery } from '../hooks/usePaginatedCustomerQuery';
import CustomersFiltersSkeleton from './CustomerFiltersSkeleton';

export default function CustomerFilters() {
  const { setFilters, resetFilters } = useCustomerTableStore();
  const { filterOptions, loading } = usePaginatedCustomerQuery();

  if (!filterOptions || loading) {
    return <CustomersFiltersSkeleton />;
  }

  return (
    <FilterContainer
      onApply={(localFilters) => setFilters(localFilters)}
      onReset={resetFilters}
    >
      {({ localFilters, setLocalFilters }) => (
        <>
          <FilterInput
            label="Cliente"
            type="autocomplete"
            freeSolo
            options={filterOptions.clientes?.filter((v, i, a) => v && a.indexOf(v) === i) || []}
            value={localFilters.cliente || ''}
            onChange={(value) => setLocalFilters((prev) => ({ ...prev, cliente: value }))}
          />
          <FilterInput
            label="Teléfonos"
            type="autocomplete"
            freeSolo
            options={filterOptions.telefonos?.filter((v, i, a) => v && a.indexOf(v) === i) || []}
            value={localFilters.telefono || ''}
            onChange={(value) => setLocalFilters((prev) => ({ ...prev, telefono: value }))}
          />
          <FilterInput
            label="Región"
            type="autocomplete"
            freeSolo
            options={filterOptions.regiones?.filter((v, i, a) => v && a.indexOf(v) === i) || []}
            value={localFilters.region || ''}
            onChange={(value) => setLocalFilters((prev) => ({ ...prev, region: value }))}
          />
          <FilterInput
            label="Zona"
            type="autocomplete"
            freeSolo
            options={filterOptions.zonas?.filter((v, i, a) => v && a.indexOf(v) === i) || []}
            value={localFilters.zona || ''}
            onChange={(value) => setLocalFilters((prev) => ({ ...prev, zona: value }))}
          />
          <FilterInput
            label="Clasificación"
            type="autocomplete"
            freeSolo
            options={filterOptions.clasificaciones?.filter((v, i, a) => v && a.indexOf(v) === i) || []}
            value={localFilters.clasificacion || ''}
            onChange={(value) => setLocalFilters((prev) => ({ ...prev, clasificacion: value }))}
          />
          <FilterInput
            label="Tipo Ruta"
            type="autocomplete"
            freeSolo
            options={filterOptions.tiposRuta?.filter((v, i, a) => v && a.indexOf(v) === i) || []}
            value={localFilters.tipoRuta || ''}
            onChange={(value) => setLocalFilters((prev) => ({ ...prev, tipoRuta: value }))}
          />
          <FilterInput
            label="Bodega"
            type="autocomplete"
            freeSolo
            options={filterOptions.bodegas?.filter((v, i, a) => v && a.indexOf(v) === i) || []}
            value={localFilters.bodega || ''}
            onChange={(value) => setLocalFilters((prev) => ({ ...prev, bodega: value }))}
          />
        </>
      )}
    </FilterContainer>
  );
}
