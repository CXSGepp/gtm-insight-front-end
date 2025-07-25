import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../../../app/providers/services/dashboard.service';
import { useWarehouseTableStore } from '../store/warehouseTableStore';

export function usePaginatedWarehouseQuery() {
  const {
    filters,
    page,
    pageSize,
    total,
    setTotal,
  } = useWarehouseTableStore();
 
   const {
    data: tableData = [],
    isLoading: isTableLoading, 
    isFetching: isTableFetching,
    error: tableError,
  } = useQuery({
    queryKey: ['warehouse', filters, page, pageSize],
    queryFn: async () => {
      const result = await dashboardService.fetchDashboardWarehouseData(page, pageSize, filters);
      setTotal(result.total);
      return result.items ?? [];
    },
    keepPreviousData: true,
  });

  const {
    data: filterOptions,
  } = useQuery({
    queryKey: ['warehouseFilterOptions'],
    queryFn: () => dashboardService.fetchFilterOptions(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return {
    rows: tableData,
    loading: isTableLoading,
    isFetching: isTableFetching,
    error: tableError,
    total,
    page,
    pageSize,
    filterOptions,
  };
}