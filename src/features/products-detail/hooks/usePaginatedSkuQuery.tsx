import { useEffect, useState } from 'react';
import { skuService } from '../../../app/providers';
import { useSkuTableStore } from '../store/skuTableStore';

export function usePaginatedSkuQuery() {
  const { filters, page, pageSize, setTotal, bodega, cliente, total } = useSkuTableStore();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const params = { page, limit: pageSize, filters, bodega, cliente };
        const data = await skuService.fetchSkusForRow(params);
        setRows(data.items);
        setTotal(data.total);  
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filters, page, pageSize, bodega, cliente, setTotal]);

  return {
    rows,
    loading,
    page,
    pageSize,
    total,
  };
}
