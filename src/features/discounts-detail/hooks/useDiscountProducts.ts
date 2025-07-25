import { useQuery } from '@tanstack/react-query';
import { discountService } from '../../../app/providers/services/discount.service';
import { DiscProductsQueryParams, DiscProductResponse, DiscProductItem } from '../../../shared/types/discount.types';

export function useDiscountProductsQuery(params: DiscProductsQueryParams) {

  const enabled = !!params.bodega && !!params.id_desc;

  const { data, isLoading, isFetching } = useQuery<DiscProductResponse<DiscProductItem>>({
    queryKey: ['discount-products', params],
    queryFn: () => discountService.fetchDiscountProductsForRow(params),
    enabled,
    keepPreviousData: true,
    
    staleTime: 5 * 60 * 1000,
  });


  return {
    data,
    loading: isLoading, 
  };
}