import { useQuery } from '@tanstack/react-query';
import { skuService } from '../../../app/providers';
import { SkuQueryParams } from '../../../shared/types/sku.types';

export function usePaginatedSkuQuery({
  bodega,
  cliente,
  claveLista,
  page,
  pageSize,
}: {
  bodega: number;
  cliente?: number;
  claveLista?: number;
  page: number;
  pageSize: number;
}) {
  const enabled = !!bodega;

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['skus', { bodega, cliente, claveLista, page, pageSize }],
    queryFn: () =>
      skuService.fetchSkusForRow({
        bodega,
        cliente,
        claveLista,
        page,
        limit: pageSize,
      }),
    enabled,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutos (ajustable)
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
