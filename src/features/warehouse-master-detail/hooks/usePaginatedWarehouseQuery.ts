import { useEffect, useState } from 'react';
import { dashboardService } from '../../../app/providers/services/dashboard.service';
import { useWarehouseTableStore } from '../store/warehouseTableStore';

export function usePaginatedWarehouseQuery() {
  const { filters, page, pageSize, total, setTotal } = useWarehouseTableStore();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    (async () => {
      setLoading(true);
      try {
        const data = await dashboardService.fetchDashboardData(page, pageSize, filters);
        if (!ignore) {
          setRows(data?.items ?? []);   // ← always an array
          setTotal(data.total ?? 0);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, [filters, page, pageSize, setTotal]);

  return {
    rows,
    total,
    loading,
    page,
    pageSize,
  };
}
