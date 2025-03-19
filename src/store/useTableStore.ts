import { create } from "zustand";

type FilterValue = string | number;
type Filters = Record<string, FilterValue>;

interface TableState {
  filters: Filters;
  cursor: string | null;
  mode: "cache" | "database";
  limit: number;
  page: number; 
  total: number;
  setPage: (page: number) => void;
  setFilters: (filters: Filters) => void;
  setCursor: (cursor: string | null) => void;
  setMode: (mode: "cache" | "database") => void;
  setLimit: (limit: number) => void;
  setTotal: (total: number) => void;
}

const normalizeFilterKey = (key: string): string => {
  return key.toLowerCase().trim();
};

export const useTableStore = create<TableState>((set) => ({
  filters: {},
  cursor: null,
  mode: "cache",
  limit: 50,
  page: 0,
  total: 0,
  setPage: (page: number) => set({ page }),
  setFilters: (filters) => {
    const cleanedFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        const normalizedKey = normalizeFilterKey(key);
        
        if (normalizedKey === "bodega" || normalizedKey === "cliente") {
          acc[normalizedKey] = typeof value === "number" ? value : Number(value);
        } else {
          acc[normalizedKey] = typeof value === "number" ? String(value) : String(value).trim();
        }
      }
      return acc;
    }, {} as Filters);

    console.log("📝 Filtros normalizados:", cleanedFilters);
    console.log("🔍 Tipos de datos:", Object.entries(cleanedFilters).reduce((acc, [key, value]) => {
      acc[key] = typeof value;
      return acc;
    }, {} as Record<string, string>));
    
    set({
      filters: cleanedFilters,
      cursor: null,
      mode: Object.keys(cleanedFilters).length ? "database" : "cache",
    });
  },
  setCursor: (cursor) => set({ cursor }),
  setMode: (mode) => set({ mode }),
  setLimit: (limit: number) => {
    console.log("📊 Actualizando límite a:", limit);
    set({ limit, page: 0 });
  },
  setTotal: (total: number) => set({ total })
}));