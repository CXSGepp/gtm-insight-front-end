import { useEffect, useState } from "react";
import { fetchEtmDashboardData, fetchDistinctFilters  } from "../api/fetchData";
import { useTableStore } from "../store/useTableStore";

/**
 * This hook does server-side pagination:
 * - We read "page" & "limit" from a store or local state
 * - Each time "page" or "limit" changes, fetch the correct slice
 * - Return the rows, total, loading, etc.
 */
export function usePaginatedQuery() {
  // Suppose we store page & limit in a store. Alternatively, use local state.
  const { filters, page, limit, total, setTotal } = useTableStore();

  // The data & total come from the server
  const [rows, setRows] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const [filterOptions, setFilterOptions] = useState({
    clientes: [],
    telefonos: [],
    regiones: [],
    zonas: [],
    bodegas: [],
    tiposRuta: [],
    clasificaciones: [],
    skus: [],
    baseDatos: [],
    estatusOpm: [],
    estatusSio: [],
    uopm: [],
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {

        const response = await fetchEtmDashboardData(page, limit, filters);
        setRows(response.items);
        setTotal(response.total); // Make sure your server returns the real total
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [page, limit, filters, setTotal]);

  useEffect(() => {
    async function loadFilters() {
      try {
        const response = await fetchDistinctFilters();
        console.log("📊 Filter Options Received:", response); 
        setFilterOptions(response);
      } catch (error) {
        console.error("❌ Error fetching filters:", error);
      }
    }
    loadFilters();
  }, []);

  return {
    rows,      // current slice of data from the server
    total,     // total row count from the server
    loading,
    page,
    limit,
    filterOptions
  };
}
