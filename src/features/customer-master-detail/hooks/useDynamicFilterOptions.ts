import { useEffect, useState } from 'react';
import { dashboardService } from '../../../app/providers/services/dashboard.service';
import { useCustomerTableStore } from '../store/customerTableStore';
import { DashboardFilters } from '../../../shared/types/dashboard.types';

// currentLocalFilters: los filtros seleccionados en el formulario en CustomerFilters.tsx
// fetcher: la función que llama al backend para obtener las opciones
// predicateForLocal: decide si se debe hacer el fetch basado en currentLocalFilters
// initialLoadPredicate: decide si se debe hacer un fetch inicial basado en filtros globales (para la carga al inicio/reset)
// globalFilters: los filtros del store de Zustand, para el initialLoadPredicate
function useFilteredOptions<T = string[] | number[]>(
  fetcher: (filters: Partial<DashboardFilters>) => Promise<T>,
  currentLocalFilters: Partial<DashboardFilters>,
  predicateForLocal: (activeLocalFilters: Partial<DashboardFilters>) => boolean,
  initialLoadPredicate: (activeGlobalFilters: Partial<DashboardFilters>) => boolean,
  globalFilters: Partial<DashboardFilters> // Este es el quinto argumento esperado
) {
  const initialFiltersLoaded = useCustomerTableStore((s) => s.initialFiltersLoaded);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let ignore = false;
    let shouldFetch = false;
    let filtersToUse: Partial<DashboardFilters> = {};

    if (!initialFiltersLoaded && initialLoadPredicate(globalFilters)) {
      shouldFetch = true;
      filtersToUse = globalFilters;
    } else if (initialFiltersLoaded && predicateForLocal(currentLocalFilters)) {
      shouldFetch = true;
      filtersToUse = currentLocalFilters;
    } else if (initialFiltersLoaded && !predicateForLocal(currentLocalFilters)) {
      if (!ignore) setData(null);
      setLoading(false);
      return;
    }

    if (!shouldFetch) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetcher(filtersToUse)
      .then((result) => {
        if (!ignore) setData(result);
      })
      .catch((err) => {
        if (!ignore) setError(err);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [
    JSON.stringify(currentLocalFilters),
    JSON.stringify(globalFilters),
    initialFiltersLoaded,
    fetcher,
    predicateForLocal,
    initialLoadPredicate,
  ]);

  return { data, loading, error };
}

// --- Hooks de Opciones ---

export const useZonasOptions = (
  currentLocalFilters: Partial<DashboardFilters>,
  globalFilters: Partial<DashboardFilters> // Asegúrate que este parámetro se use o se marque como no usado si es intencional
) =>
  useFilteredOptions(
    dashboardService.fetchZonasFiltered,
    currentLocalFilters,
    (local) => !!local.region,
    // Corregido: Eliminado global.viewMode, y asegurando que globalFilters se pase
    (global) => !!global.region, // Simplificado, ajusta si necesitas lógica más compleja con globalFilters
    globalFilters // <-- AÑADIDO globalFilters como quinto argumento
  );

export const useRegionsOptions = (
  currentLocalFilters: Partial<DashboardFilters>,
  globalFilters: Partial<DashboardFilters> // ESLint se quejaba de que no se usaba, pero se pasa a useFilteredOptions
) =>
  useFilteredOptions(
    dashboardService.fetchRegionsFiltered,
    currentLocalFilters,
    (_local) => true,
    (_global) => true,
    globalFilters // Se pasa globalFilters a useFilteredOptions
  );

export const useClasificacionOptions = (
  currentLocalFilters: Partial<DashboardFilters>,
  globalFilters: Partial<DashboardFilters>
) =>
  useFilteredOptions(
    dashboardService.fetchClasificacionFiltered,
    currentLocalFilters,
    (local) => !!local.zona,
    (global) => !!global.zona,
    globalFilters
  );

export const useRutaOptions = (
  currentLocalFilters: Partial<DashboardFilters>,
  globalFilters: Partial<DashboardFilters>
) =>
  useFilteredOptions(
    dashboardService.fetchRutaFiltered,
    currentLocalFilters,
    (local) => !!local.zona,
    (global) => !!global.zona,
    globalFilters
  );

export const useCanalOptions = (
  currentLocalFilters: Partial<DashboardFilters>,
  globalFilters: Partial<DashboardFilters>
) =>
  useFilteredOptions(
    dashboardService.fetchCanalFiltered,
    currentLocalFilters,
    (local) => !!local.clasificacion,
    (global) => !!global.clasificacion,
    globalFilters
  );

export const useIdBodegaOptions = (
  currentLocalFilters: Partial<DashboardFilters>,
  globalFilters: Partial<DashboardFilters>
) =>
  useFilteredOptions(
    dashboardService.fetchIdBodegaFiltered,
    currentLocalFilters,
    (local) => !!local.localidad,
    (global) => !!global.localidad,
    globalFilters
  );

export const useClaveListaOptions = (
  currentLocalFilters: Partial<DashboardFilters>,
  globalFilters: Partial<DashboardFilters>
) =>
  useFilteredOptions(
    dashboardService.fetchClaveListaFiltered,
    currentLocalFilters,
    (local) => !!local.bodega || !!local.nombre,
    (global) => !!global.bodega || !!global.nombre,
    globalFilters
  );