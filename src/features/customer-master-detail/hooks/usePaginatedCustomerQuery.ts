import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../../../app/providers/services/dashboard.service';
import { useCustomerDashboardStore } from '../store/customerTableStore';
export function usePaginatedCustomerQuery() {
  const {
    filters,
    page,
    pageSize,
    total,
    setTotal,
  } = useCustomerDashboardStore();
 
   const {
    data: tableData,
    isLoading: isTableLoading, 
    isFetching: isTableFetching,
    error: tableError,
  } = useQuery({
    queryKey: ['customers', filters, page, pageSize],
    queryFn: async () => {
      const result = await dashboardService.fetchDashboardData(page, pageSize, filters);
      setTotal(result.total); // mantiene sincronizado Zustand
      return result.items;
    },
    keepPreviousData: true,
  });

  const {
    data: filterOptions,
  } = useQuery({
    queryKey: ['customerFilterOptions'],
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
