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
          // 🔥 Transformar: quitar los "vw_" de todas las llaves
          const transformedItems = data.items.map((item: Record<string, any>) => {
            const newItem: Record<string, any> = {};
            for (const key in item) {
              const cleanKey = key.startsWith('vw_') ? key.slice(3) : key;  // remove "vw_" if present
              newItem[cleanKey] = item[key];
            }
            return newItem;
          });
        
          setRows(transformedItems);  // 👈 Ahora tendrás objetos limpios
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
