import { useQuery } from '@tanstack/react-query';
import { skuService } from '../../../app/providers';

export function usePaginatedSkuQuery({
  bodega,
  page,
  pageSize,
}: {
  bodega: number;
  page: number;
  pageSize: number;
}) {
  const enabled = !!bodega;

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['skus', { bodega, page, pageSize }],
    queryFn: () =>
      skuService.fetchSkusForRow({
        bodega,
        page,
        limit: pageSize,
      }),
    enabled,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, 
  });

  return {
    rows: data?.items ?? [],
    total: data?.total ?? 0,
    isLoading,
    isFetching,
    error,
    page,
    pageSize,
  };
}
