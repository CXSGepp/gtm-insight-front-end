import { useEffect, useState } from 'react';
import { skuService } from '../../../app/providers';
import { useSkuTableStore } from '../store/skuTableStore';

export function usePaginatedSkuQuery() {
  const {
    filters = {},
    page,
    pageSize,
    setTotal,
    bodega,
    cliente,
  } = useSkuTableStore();

  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!bodega) {
      console.warn('[⚠️ usePaginatedSkuQuery] Missing bodega, skipping fetch.');
      return;
    }

    const params = {
      page,
      limit: pageSize,
      filters,
      bodega,
      cliente,
    };

    console.log('[📦 Fetch SKUs params]', params);

    async function fetchData() {
      if (!bodega) return; 
      setLoading(true);
      try {
        console.log('[🧾 SKUS fetch params]', {
          page,
          limit: pageSize,
          filters,
          bodega,
          cliente,
        });
        const data = await skuService.fetchSkusForRow(params);
        setRows(data.items);
        setTotal(data.total);
      } catch (err) {
        console.error('[❌ Failed to fetch SKUs]', err);
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
    total: useSkuTableStore.getState().total,
  };
}
