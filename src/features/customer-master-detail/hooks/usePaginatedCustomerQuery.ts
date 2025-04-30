import { useEffect, useState } from 'react';
import { dashboardService } from '../../../app/providers/services/dashboard.service';
import { useCustomerTableStore } from '../store/customerTableStore';
import { DashboardFilterOptions } from '../../../shared/types/dashboard.types';

const empty: DashboardFilterOptions = {
  clientes: [], telefonos: [], regiones: [],
  zonas: [], bodegas: [], tiposRuta: [], clasificaciones: [],
};

export function usePaginatedCustomerQuery() {
  const { filters, page, pageSize, total, setTotal } = useCustomerTableStore();

  const [rows, setRows] = useState<any[]>([]);
  const [filterOptions, setFilterOptions] = useState<DashboardFilterOptions>(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /* ---------- data ---------- */
  useEffect(() => {
    
    let ignore = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await dashboardService.fetchDashboardData(
          page,
          pageSize,
          filters,
          'CUSTOMER',
        );
        if (!ignore) {
          console.log('[🧪 Raw result]', result);
          setRows(result.items);
          setTotal(result.total);
          console.log('[🔍 rows]', data.items);

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
      .catch(() => setFilterOptions(empty));
  }, []);

  return { rows, total, loading, error, page, pageSize, filterOptions };
}
