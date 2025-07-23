import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../../../app/providers/services/dashboard.service';

import { useEffect } from 'react';
import { useWarehouseDashboardStore } from '../store/warehouseTableStore';

export function usePaginatedWarehouseQuery() {
  const {
    filters,
    page,
    pageSize,
    total,
    setTotal,
    filterOptions,
    setFilterOptions,
    setFilterLoading,
  } = useWarehouseDashboardStore();
 
  const query = useQuery({
    queryKey: ['customers', filters, page, pageSize],
    queryFn: async () => {
      const result = await dashboardService.fetchDashboardData(page, pageSize, filters);
      setTotal(result.total); // mantiene sincronizado Zustand
      return result.items;
    },
    keepPreviousData: true,
  });

  // Cargar opciones de filtro iniciales una vez
  useEffect(() => {
    (async () => {
      setFilterLoading(true);
      try {
        const options = await dashboardService.fetchFilterOptions();
        setFilterOptions(options);
      } catch (err) {
        setFilterOptions({
          localidades: [],
          bodegas: [],
          regiones: [],
          zonas: [],
          ruta: [],
          clasificaciones: [],
          claveLista: [],
          canal: [],
        });
      } finally {
        setFilterLoading(false);
      }
    })();
  }, [setFilterOptions, setFilterLoading]);

  return {
    rows: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
    total,
    page,
    pageSize,
    filterOptions,
  };
}

