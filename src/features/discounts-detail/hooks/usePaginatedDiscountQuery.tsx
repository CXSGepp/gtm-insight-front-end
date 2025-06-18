// src/features/discounts-detail/hooks/usePaginatedDiscountQuery.tsx
import { useEffect, useState } from 'react';
import { discountService } from '../../../app/providers/services/discount.service';
import { useDiscountTableStore } from '../store/discountTableStore';

export function usePaginatedDiscountQuery({
  bodega,
  cliente,
  page,
  pageSize,
}: {
  bodega: number;
  cliente?: number;
  page: number;
  pageSize: number;
}) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const { setPagination } = useDiscountTableStore();

  useEffect(() => {
    if (!bodega) {
      setRows([]);
      setTotal(0);
      setHasMore(false);
      return;
    }

    setLoading(true);
    discountService
      .fetchDiscountsForRow({
        bodega,
        cliente,
        page,
        limit: pageSize,
      })
      .then((data) => {
        setRows(data.items);
        setTotal(data.total);
        setHasMore(data.hasMore);
        setPagination(page, pageSize);
      })
      .finally(() => setLoading(false));
  }, [bodega, cliente, page, pageSize, setPagination]);

  return { rows, loading, total, hasMore, page, pageSize };
}