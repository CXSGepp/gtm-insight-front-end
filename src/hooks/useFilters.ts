import { useTableStore } from "../store/useTableStore";

export function useFilters() {
  const { filters, setFilters } = useTableStore();

  const resetFilters = () => setFilters({});

  return { filters, setFilters, resetFilters };
}
