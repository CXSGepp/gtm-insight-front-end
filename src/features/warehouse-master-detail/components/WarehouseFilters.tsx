import React from 'react';
import FilterContainer from '../../../shared/components/filters/filter-container/FilterContainer';
import FilterInput from '../../../shared/components/filters/filter-input/FilterInput';
import { useWarehouseFilters } from '../hooks/useWarehouseFilters';

export default function WarehouseFilters() {

  const {
      filters,
      filterOptions,
      isLoading,
      applyFilters,
      resetAll,
      onFilterChange,
    } = useWarehouseFilters();

    return (
      <FilterContainer
        onApply={applyFilters}
        onReset={resetAll}
      >
        {({ localFilters, setLocalFilters }) => (
          <>
    
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
