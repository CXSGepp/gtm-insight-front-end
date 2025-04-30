import { useEffect, useState } from 'react';
import { dashboardService } from '../../../app/providers/services/dashboard.service';
import { useCustomerTableStore } from '../store/customerTableStore';
import { DashboardFilterOptions, DashboardItem } from '../../../shared/types/dashboard.types';

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

  /* ---------- fetch data ---------- */
  useEffect(() => {
    let ignore = false;

    (async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('[🎯 Sending filters]', filters);
        const result = await dashboardService.fetchDashboardData(
          page,
          pageSize,
          filters,
          'CUSTOMER',
        );

        console.log('[🧪 Raw result]', result);

        if (!ignore) {
          console.log('[🧪 Raw result]', result);
          setRows([...result.items]); ;
          setTotal(result.total);
        }
      } catch (err) {
        if (!ignore) setError(err as Error);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => { ignore = true };
  }, [filters, page, pageSize, setTotal]);

  /* ---------- fetch filter options ---------- */
  useEffect(() => {
    dashboardService
      .fetchFilterOptions()
      .then(setFilterOptions)
      .catch(() => setFilterOptions(empty));
  }, []);

  return { rows, total, loading, error, page, pageSize, filterOptions };
}
