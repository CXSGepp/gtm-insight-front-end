import React from 'react';
import FilterContainer from '../../../shared/components/filters/filter-container/FilterContainer';
import FilterInput from '../../../shared/components/filters/filter-input/FilterInput';
import { useCustomerTableStore } from '../store/customerTableStore';
import { usePaginatedCustomerQuery } from '../hooks/usePaginatedCustomerQuery';
import CustomersFiltersSkeleton from './CustomerFiltersSkeleton';

// Helper para convertir strings numéricos a number
function sanitizeFilters(filters: Record<string, any>) {
  const parsed = { ...filters };

  // Campos numéricos conocidos
  const numericFields = ['bodega', 'zona'];

  for (const key of numericFields) {
    if (parsed[key] && typeof parsed[key] === 'string' && /^\d+$/.test(parsed[key])) {
      parsed[key] = Number(parsed[key]);
    }
  }

  return parsed;
}

export default function CustomerFilters() {
  const { setFilters, resetFilters } = useCustomerTableStore();
  const { filterOptions, loading } = usePaginatedCustomerQuery();

  if (!filterOptions || loading) {
    return <CustomersFiltersSkeleton />;
  }

  return (
    <FilterContainer
    onApply={(localFilters) => {
      const sanitized = sanitizeFilters(localFilters);
      console.log('[🧼 Filtros sanitizados a aplicar]', sanitized); // 👈 AQUI EL LOG
      setFilters(sanitized);
    }}
          
      onReset={() => {
        resetFilters();
        setFilters({ viewMode: 'CUSTOMER' });
      }}
    >
      {({ localFilters, setLocalFilters }) => (
        <>
          <FilterInput
            label="Cliente"
            type="autocomplete"
            freeSolo
            options={
              (filterOptions.clientes ?? [])
                .filter((v, i, a) => v != null && a.indexOf(v) === i)
                .map((v) => ({ label: String(v), value: v }))
            }
            value={localFilters.cliente ?? ''}
            onChange={(value) => setLocalFilters({ ...localFilters, cliente: value })}
          />

          <FilterInput
            label="Teléfonos"
            type="autocomplete"
            freeSolo
            options={
              (filterOptions.telefonos ?? [])
                .filter((v, i, a) => v && a.indexOf(v) === i)
                .map((v) => ({ label: String(v), value: v }))
            }
            value={localFilters.telefono ?? ''}
            onChange={(value) => setLocalFilters({ ...localFilters, telefono: value })}
          />

          <FilterInput
            label="Región"
            type="autocomplete"
            freeSolo
            options={
              (filterOptions.regiones ?? [])
                .filter((v, i, a) => v && a.indexOf(v) === i)
                .map((v) => ({ label: String(v), value: v }))
            }
            value={localFilters.region ?? ''}
            onChange={(value) => setLocalFilters({ ...localFilters, region: value })}
          />

          <FilterInput
            label="Zona"
            type="autocomplete"
            freeSolo
            options={
              (filterOptions.zonas ?? [])
                .filter((v, i, a) => v && a.indexOf(v) === i)
                .map((v) => ({ label: String(v), value: v }))
            }
            value={localFilters.zona ?? ''}
            onChange={(value) => setLocalFilters({ ...localFilters, zona: value })}
          />

          <FilterInput
            label="Clasificación"
            type="autocomplete"
            freeSolo
            options={
              (filterOptions.clasificaciones ?? [])
                .filter((v, i, a) => v && a.indexOf(v) === i)
                .map((v) => ({ label: String(v), value: v }))
            }
            value={localFilters.clasificacion ?? ''}
            onChange={(value) => setLocalFilters({ ...localFilters, clasificacion: value })}
          />

          <FilterInput
            label="Tipo Ruta"
            type="autocomplete"
            freeSolo
            options={
              (filterOptions.tiposRuta ?? [])
                .filter((v, i, a) => v && a.indexOf(v) === i)
                .map((v) => ({ label: String(v), value: v }))
            }
            value={localFilters.tipoRuta ?? ''}
            onChange={(value) => setLocalFilters({ ...localFilters, tipoRuta: value })}
          />

          <FilterInput
            label="Bodega"
            type="autocomplete"
            freeSolo
            options={
              (filterOptions.bodegas ?? [])
                .filter((v, i, a) => v != null && a.indexOf(v) === i)
                .map((v) => ({ label: String(v), value: v }))
            }
            value={localFilters.bodega ?? ''}
            onChange={(value) => setLocalFilters({ ...localFilters, bodega: value })}
          />
        </>
      )}
    </FilterContainer>
  );
}
