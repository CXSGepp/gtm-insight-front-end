import { useQuery } from '@tanstack/react-query';
import { discountService } from '../../../app/providers/services/discount.service';
import { DiscountQueryParams } from '../../../shared/types/discount.types';

export function useDiscountsQuery(params: DiscountQueryParams) {
  const enabled = !!params?.bodega;

  return useQuery({
    queryKey: ['discounts', params],
    queryFn: () => discountService.fetchDiscountsForRow(params),
    enabled,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
}
