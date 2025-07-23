import { useDiscountTableStore } from '../store/discountTableStore';
import { useQuery } from '@tanstack/react-query';
import { discountService } from '../../../app/providers/services/discount.service';

export function usePaginatedDiscountQuery() {
  const {
    bodega,
    cliente,
    page,
    pageSize,
    setPagination,
    setTotal,
  } = useDiscountTableStore();

  const enabled = !!bodega;

  const query = useQuery({
    queryKey: ['discounts', bodega, cliente, page, pageSize],
    queryFn: async () => {
      const result = await discountService.fetchDiscountsForRow({
        bodega,
        cliente,
        page,
        limit: pageSize,
      });
      setTotal(result.total);
      setPagination(page, pageSize);
      return result;
    },
    enabled,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  return {
    ...query,
    rows: query.data?.items || [],
    total: query.data?.total || 0,
  };
}