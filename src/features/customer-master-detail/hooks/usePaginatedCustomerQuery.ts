import { useEffect, useState } from 'react';
import { dashboardService } from '../../../app/providers/services/dashboard.service';
import { useCustomerTableStore } from '../store/customerTableStore';
import { DashboardFilterOptions } from '../../../shared/types/dashboard.types';

const emptyFilterOptions: DashboardFilterOptions = {
  clientes: [],
  telefonos: [],
  regiones: [],
  zonas: [],
  bodegas: [],
  tiposRuta: [],
  clasificaciones: [],
};

export function usePaginatedCustomerQuery() {
  const { filters, page, pageSize, total, setTotal } = useCustomerTableStore();

  const [rows, setRows] = useState<any[]>([]);
  const [filterOptions, setFilterOptions] =
    useState<DashboardFilterOptions>(emptyFilterOptions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 🔄 Cargar datos paginados
  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const data = await dashboardService.fetchDashboardData(
          page,
          pageSize,
          filters,
          'CUSTOMER' // ✅ IMPORTANTE: modo explícito
        );
        if (!ignore) {
          console.log('[Customer Query Response]', data);
          setRows(data?.items ?? []);
          setTotal(data?.total ?? 0);
        }
      } catch (err) {
        console.error('[usePaginatedCustomerQuery] Error:', err);
        if (!ignore) setError(err as Error);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchData();
    return () => { ignore = true; };
  }, [filters, page, pageSize, setTotal]);

  // 🧭 Cargar opciones de filtros
  useEffect(() => {
    let ignore = false;
    async function fetchFilters() {
      try {
        const options = await dashboardService.fetchFilterOptions();
        if (!ignore) {
          setFilterOptions(options.getDistinctFilterOptions);
        }
      } catch (err) {
        console.error('[usePaginatedCustomerQuery] Error fetching filters:', err);
        if (!ignore) {
          setFilterOptions(emptyFilterOptions);
        }
      }
    }

    fetchFilters();
    return () => { ignore = true; };
  }, []);

  return {
    rows,
    total,
    loading,
    error,
    page,
    pageSize,
    filterOptions,
  };
}
