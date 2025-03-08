import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FilterState {
  REGION?: string | number;
  ZONA?: string | number;
  LOCALIDAD?: string | number;
  BODEGA?: string | number;
  RUTA?: string | number;
  CLIENTE?: string | number;
  NOMBRE?: string | number;
  TIPO_RUTA?: string | number;
  CLASIFICACION?: string | number;
  CLAVE_LISTA?: string | number;
  TELEFONO?: string | number;
}

interface DashboardState {
  filters: FilterState;
  cursor: string | null;
  pageSize: number;
  isLoading: boolean;
  setFilters: (filters: Partial<FilterState>) => void;
  setCursor: (cursor: string | null) => void;
  setPageSize: (size: number) => void;
  setLoading: (loading: boolean) => void;
  clearFilters: () => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      filters: {},
      cursor: null,
      pageSize: 100,
      isLoading: false,

      setFilters: (newFilters) => {
        set((state) => {
          console.group('🔄 Actualizando Filtros');
          console.log('Filtros anteriores:', state.filters);
          console.log('Nuevos filtros:', newFilters);
          
          const updatedFilters = {
            ...state.filters,
            ...Object.entries(newFilters).reduce((acc, [key, value]) => {
              // Solo incluir valores definidos y no vacíos
              if (value !== undefined && value !== '') {
                acc[key as keyof FilterState] = value as string | number | undefined;
              }
              return acc;
            }, {} as FilterState)
          };
          
          console.log('Filtros finales:', updatedFilters);
          console.groupEnd();
          
          return {
            filters: updatedFilters
          };
        });
      },

      setCursor: (cursor) => set({ cursor }),

      setPageSize: (pageSize) => set({ pageSize }),

      setLoading: (isLoading) => set({ isLoading }),

      clearFilters: () =>
        set(() => {
          console.log("🧹 Limpiando filtros...");
          return { filters: {}, cursor: null };
        }),    }),
    {
      name: "dashboard-store",
    }
  )
);
