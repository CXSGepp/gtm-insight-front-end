import { useEffect, useState } from 'react';
import { dashboardService } from '../../../app/providers/services/dashboard.service';
import { useWarehouseTableStore } from '../store/warehouseTableStore';

export function usePaginatedWarehouseQuery() {
  const { filters, page, pageSize, total, setTotal } = useWarehouseTableStore();

  const [rows, setRows] = useState<any[]>([]);
  const [filterOptions, setFilterOptions] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  /* ---------- data ---------- */
  useEffect(() => {
    let ignore = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await dashboardService.fetchDashboardData(
          page,
          pageSize,
          filters,
          'WAREHOUSE',
        );
        if (!ignore) {
          setRows(data.items);
          setTotal(data.total);
        }
      } catch (err) {
        if (!ignore) setError(err as Error);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, [filters, page, pageSize, setTotal]);

  /* ---------- filters ---------- */
  useEffect(() => {
    dashboardService
      .fetchFilterOptions()
      .then(setFilterOptions)
      .catch(() => setFilterOptions({}));
  }, []);

  return { rows, total, loading, error, page, pageSize, filterOptions };
}
