import { useEffect, useState } from 'react';
import { dashboardService } from '../../../app/providers/services/dashboard.service';
import { useWarehouseTableStore } from '../store/warehouseTableStore';

export function usePaginatedWarehouseQuery() {
  const { filters, page, pageSize, total, setTotal } = useWarehouseTableStore();

  const [rows, setRows] = useState<any[]>([]);
  const [filterOptions, setFilterOptions] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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
          'WAREHOUSE'
        );
        if (!ignore) {
          setRows(data?.items ?? []);
          setTotal(data?.total ?? 0);
        }
      } catch (err) {
        console.error('[usePaginatedWarehouseQuery] Error fetching data:', err);
        if (!ignore) {
          setError(err as Error);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchData();
    return () => { ignore = true; };
  }, [filters, page, pageSize, setTotal]);

  useEffect(() => {
    let ignore = false;
    async function fetchFilters() {
      try {
        const response = await dashboardService.fetchFilterOptions();
        if (!ignore) {
          setFilterOptions(response.getDistinctFilterOptions ?? {});
        }
      } catch (err) {
        console.error('[usePaginatedWarehouseQuery] Error fetching filters:', err);
        if (!ignore) {
          setFilterOptions({});
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
