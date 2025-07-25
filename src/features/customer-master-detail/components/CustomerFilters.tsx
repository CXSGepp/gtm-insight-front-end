import React, { useState } from 'react';
import FilterContainer from '../../../shared/components/filters/filter-container/FilterContainer';
import FilterInput from '../../../shared/components/filters/filter-input/FilterInput';
import { useCustomerFilters } from '../hooks/useCustomerFilters';
import { useNameSearch } from '../hooks/useNameSearch'; // Asumo que es tu hook para nombre
import { useIdClientSearch } from '../hooks/useIdClientSearch'; 

export default function CustomerFilters() {
  const {
    filters,
    filterOptions,
    isLoading,
    applyFilters,
    resetAll,
    onFilterChange,
  } = useCustomerFilters();

  const [nombreInput, setNombreInput] = useState('');
  const { options: nombreOptions, loading: nombreLoading } = useNameSearch(nombreInput);

  const [clienteIdInput, setClienteIdInput] = useState('');
  const { options: clienteIdOptions, loading: clienteIdLoading } = useIdClientSearch(clienteIdInput);

  return (
    <FilterContainer
      onApply={applyFilters}
      onReset={resetAll}
    >
      {({ localFilters, setLocalFilters }) => (
        <>
          <FilterInput
            label="Nombre Cliente"
            type="autocomplete"
            loading={nombreLoading}
            value={localFilters.nombre ?? ''}
            options={(nombreOptions ?? []).map((v) => ({ label: v, value: v }))}
            onInputValueChange={setNombreInput}
            onChange={(value) => onFilterChange('nombre', value, localFilters, setLocalFilters)}
          />
          <FilterInput
            label="Código Cliente"
            type="autocomplete"
            loading={clienteIdLoading}
            value={localFilters.cliente ?? ''}
            options={(clienteIdOptions ?? []).map((v) => ({ label: String(v), value: v }))}
            onInputValueChange={setClienteIdInput}
            onChange={(value) => onFilterChange('cliente', value, localFilters, setLocalFilters)}
          />
  
  
          <FilterInput
            label="Bodega"
            type="autocomplete"
            loading={isLoading}
            options={filterOptions.localidades.map((v) => ({ label: String(v), value: v }))}
            value={localFilters.localidad ?? ''}
            onChange={(value) => onFilterChange('localidad', value, localFilters, setLocalFilters)}
          />

          <FilterInput
            label="Id Bodega"
            type="autocomplete"
            loading={isLoading}
            options={filterOptions.bodegas.map((v) => ({ label: String(v), value: v }))}
            value={localFilters.bodega ?? ''}
            onChange={(value) => onFilterChange('bodega', value, localFilters, setLocalFilters)}
          />

          <FilterInput
            label="Región"
            type="autocomplete"
            loading={isLoading}
            options={filterOptions.regiones.map((v) => ({ label: String(v), value: v }))}
            value={localFilters.region ?? ''}
            onChange={(value) => onFilterChange('region', value, localFilters, setLocalFilters)}
          />

          <FilterInput
            label="Zona"
            type="autocomplete"
            loading={isLoading}
            options={filterOptions.zonas.map((v) => ({ label: String(v), value: v }))}
            value={localFilters.zona ?? ''}
            onChange={(value) => onFilterChange('zona', value, localFilters, setLocalFilters)}
          />

          <FilterInput
            label="Clasificación"
            type="autocomplete"
            loading={isLoading}
            options={filterOptions.clasificaciones.map((v) => ({ label: String(v), value: v }))}
            value={localFilters.clasificacion ?? ''}
            onChange={(value) => onFilterChange('clasificacion', value, localFilters, setLocalFilters)}
          />

          <FilterInput
            label="Ruta"
            type="autocomplete"
            loading={isLoading}
            options={filterOptions.ruta.map((v) => ({ label: String(v), value: v }))}
            value={localFilters.ruta ?? ''}
            onChange={(value) => onFilterChange('ruta', value, localFilters, setLocalFilters)}
          />

          <FilterInput
            label="Canal"
            type="autocomplete"
            loading={isLoading}
            options={filterOptions.canal.map((v) => ({ label: String(v), value: v }))}
            value={localFilters.canal ?? ''}
            onChange={(value) => onFilterChange('canal', value, localFilters, setLocalFilters)}
          />
        </>
      )}
    </FilterContainer>
  );
}
