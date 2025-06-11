import { useEffect, useState } from 'react';
import { skuService } from '../../../app/providers';

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
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!bodega) {
      setRows([]);
      setTotal(0);
      return;
    }
    setLoading(true);
    skuService
      .fetchSkusForRow({
        bodega,
        cliente,
        claveLista,
        page,
        limit: pageSize,
      })
      .then((data) => {
        setRows(data.items);
        setTotal(data.total);
      })
      .finally(() => setLoading(false));
  }, [bodega, cliente, claveLista, page, pageSize]); // ← no `filters`

  return { rows, loading, total, page, pageSize };
}
