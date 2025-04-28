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
  tiposruta: [],
  clasificaciones: [],
};

export function usePaginatedCustomerQuery() {
  const { filters, page, pageSize, total, setTotal } = useCustomerTableStore();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterOptions, setFilterOptions] =
    useState<DashboardFilterOptions>(emptyFilterOptions);

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

  useEffect(() => {
    (async () => {
      try {
        const options = await dashboardService.fetchFilterOptions();
        setFilterOptions(options.getDistinctFilterOptions);
      } catch (e) {
        console.error('Error loading filter options', e);
      }
    })();
  }, []);

  return {
    rows,
    total,
    loading,
    page,
    pageSize,
    filterOptions,
  };
}
