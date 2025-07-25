import { useQuery } from '@tanstack/react-query';
import { useDiscountTableStore } from '../store/discountTableStore';
import { discountService } from '../../../app/providers/services/discount.service';
import { DiscountQueryParams, DiscountResponse, DiscountItem } from '../../../shared/types/discount.types'; // Ajusta la ruta si es necesario

export function usePaginatedDiscountQuery() {
  const { filters, page, pageSize, setNoDataNotified } = useDiscountTableStore();

  const enabled = !!filters.bodega;

 const { data, isLoading, isFetching } = useQuery<DiscountResponse<DiscountItem>>({
    queryKey: ['discounts', { filters, page, pageSize }],
    queryFn: () => {
      const params: DiscountQueryParams = {
        ...filters,
        page,
        limit: pageSize,
        bodega: filters.bodega,
      };
      
      return discountService.fetchDiscountsForRow(params);
    },
    enabled,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    onSuccess: (data) => {
      if (data.items.length === 0) {
        setNoDataNotified(true);
      }
    },
  });


  return {
    rows: data?.items ?? [],
    total: data?.total ?? 0,
    loading: isLoading,
    isFetching,
  };
}