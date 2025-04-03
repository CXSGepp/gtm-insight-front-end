import { useState, useEffect } from "react";
import { fetchSkusForRow } from "../api/fetchSkusForRow";
import { useTableStore } from "../store/useTableStore";

export function useSkusForRow(bodega: number, cliente?: number, page = 0, limit = 50) {
  const { filters } = useTableStore();
  const [skus, setSkus] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    async function loadSkus() {
      setLoading(true);
      try {
        const response = await fetchSkusForRow(bodega, cliente ?? undefined, filters, page, limit);
        setSkus(response.items);
        setTotal(response.total);
      } catch (error) {
        console.error("Error al cargar los SKUs:", error);
      } finally {
        setLoading(false);
      }
    }
    loadSkus();
  }, [bodega, cliente, filters, page, limit]);

  return { skus, loading, total };
}
