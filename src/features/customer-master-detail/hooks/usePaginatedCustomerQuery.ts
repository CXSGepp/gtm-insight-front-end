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
  const [filterOptions, setFilterOptions] = useState<DashboardFilterOptions>(emptyFilterOptions);

  // Fetch paginated dashboard data
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await dashboardService.fetchDashboardData(page, pageSize, filters);
        setRows(data.items);
        setTotal(data.total);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filters, page, pageSize, setTotal]);

  // Fetch filter‐options once on mount
  useEffect(() => {
    async function fetchFilters() {
      try {
        const options = await dashboardService.fetchFilterOptions();
        setFilterOptions(options.getDistinctFilterOptions);
      } catch (error) {
        console.error('Error loading filter options', error);
      }
    }
    fetchFilters();
  }, []);

  return {
    rows,
    total,            // now returns the real total from the API
    loading,
    page,
    pageSize,
    filterOptions,    // always has a full shape, never undefined
  };
}
