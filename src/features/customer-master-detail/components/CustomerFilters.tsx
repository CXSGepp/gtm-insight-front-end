import React from 'react';
import FilterContainer from '../../../shared/components/filters/filter-container/FilterContainer';
import FilterInput from '../../../shared/components/filters/filter-input/FilterInput';
import { useCustomerTableStore } from '../store/customerTableStore';
import { usePaginatedCustomerQuery } from '../hooks/usePaginatedCustomerQuery';
import CustomersFiltersSkeleton from './CustomerFiltersSkeleton';
import { useNameSearch } from '../hooks/useNameSearch';

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

  const [nombreInput, setNombreInput] = React.useState('');
  const { options: nombreOptions, loading: nombreLoading } = useNameSearch(nombreInput);

  React.useEffect(() => {
    console.log('CustomerFilters - nombreInput actual:', nombreInput);
  }, [nombreInput]);

  if (!filterOptions || loading) {
    return <CustomersFiltersSkeleton />;
  }

  return (
    <FilterContainer
    onApply={(localFilters) => {
      const sanitized = sanitizeFilters(localFilters);
      console.log('[🧼 Filtros sanitizados a aplicar]', sanitized); 
      setFilters(sanitized);
    }}
          
      onReset={() => {
        resetFilters();
      }}
    >
      {({ localFilters, setLocalFilters }) => (
        <>
          <FilterInput
            label="Nombre"
            type="autocomplete"
            loading={nombreLoading}
            value={localFilters.nombre ?? ''}
            options={(nombreOptions ?? []).map((v) => ({ label: v, value: v }))}
            onInputValueChange={(inputValue) => {
              setNombreInput(inputValue);
            }}
            onChange={(value) => setLocalFilters({ ...localFilters, nombre: value })}
          />
            <FilterInput
            label="Bodega"
            type="autocomplete"
            options={
              (filterOptions.localidades ?? [])
                .filter((v, i, a) => v != null && a.indexOf(v) === i)
                .map((v) => ({ label: String(v), value: v }))
            }
            value={localFilters.localidad ?? ''}
            onChange={(value) => setLocalFilters({ ...localFilters, localidad: value })}
          />

           <FilterInput
            label="Id Bodega"
            type="autocomplete"
            options={
              (filterOptions.bodegas ?? [])
                .filter((v, i, a) => v != null && a.indexOf(v) === i)
                .map((v) => ({ label: String(v), value: v }))
            }
            value={localFilters.bodega ?? ''}
           
            onChange={(value) => { 
             console.log('Bodega seleccionada:', value);
            setLocalFilters({ ...localFilters, bodega: value });
          }}
          />

          <FilterInput
            label="Región"
            type="autocomplete"
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
            options={
              (filterOptions.clasificaciones ?? [])
                .filter((v, i, a) => v && a.indexOf(v) === i)
                .map((v) => ({ label: String(v), value: v }))
            }
            value={localFilters.clasificacion ?? ''}
            onChange={(value) => setLocalFilters({ ...localFilters, clasificacion: value })}
          />

          <FilterInput
            label="Ruta"
            type="autocomplete"
            options={
              (filterOptions.ruta ?? [])
                .filter((v, i, a) => v && a.indexOf(v) === i)
                .map((v) => ({ label: String(v), value: v }))
            }
            value={localFilters.ruta ?? ''}
            onChange={(value) => setLocalFilters({ ...localFilters, ruta: value })}
          />
          
          <FilterInput
            label="Canal"
            type="autocomplete"
            freeSolo
            options={
              (filterOptions.canal ?? [])
                .filter((v, i, a) => v && a.indexOf(v) === i)
                .map((v) => ({ label: String(v), value: v }))
            }
            value={localFilters.canal ?? ''}
            onChange={(value) => setLocalFilters({ ...localFilters, canal: value })}
          />
          
            <FilterInput
            label="Id Producto"
            type="autocomplete"
            options={
              (filterOptions.productos ?? [])
                .filter((v, i, a) => v && a.indexOf(v) === i)
                .map((v) => ({ label: String(v), value: v }))
            }
            value={localFilters.sku ?? ''}
            onChange={(value) => setLocalFilters({ ...localFilters, sku: value })}
          />

            <FilterInput
            label="Producto"
            type="autocomplete"
            options={
              (filterOptions.descripciones ?? [])
                .filter((v, i, a) => v && a.indexOf(v) === i)
                .map((v) => ({ label: String(v), value: v }))
            }
            value={localFilters.descripcion ?? ''}
            onChange={(value) => setLocalFilters({ ...localFilters, descripcion: value })}
          />

         
        </>
      )}
    </FilterContainer>
  );
}
