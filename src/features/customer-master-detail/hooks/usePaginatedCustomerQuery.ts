import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../../../app/providers/services/dashboard.service';
import { useCustomerDashboardStore } from '../store/customerTableStore';
import { useEffect } from 'react';

export function usePaginatedCustomerQuery() {
  const {
    filters,
    page,
    pageSize,
    total,
    setTotal,
    filterOptions,
    setFilterOptions,
    setFilterLoading,
  } = useCustomerDashboardStore();
 
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
