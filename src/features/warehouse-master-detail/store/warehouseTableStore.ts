import { create } from 'zustand';
import { DashboardFilterOptions, DashboardFilters } from '../../../shared/types/dashboard.types';
import { immer } from 'zustand/middleware/immer';

interface WarehouseTableState {
  filters: DashboardFilters;
  filterOptions: DashboardFilterOptions; 
  page: number;
  pageSize: number;
  total: number;
  isFilterLoading: boolean;
  firstSelectedFilter: { key: string | null; value: any | null };
  setPagination: (page: number, size: number) => void;
  setTotal: (t: number) => void;
  patchFilters: (patch: Partial<DashboardFilters>) => void;
  resetFilters: () => void;
  setFilterOptions: (opt: DashboardFilterOptions) => void;
  setFilterLoading: (flag: boolean) => void;
  setFirstSelected: (key: string, value: any) => void;
  resetFirstSelected: () => void;
}

const emptyOptions: DashboardFilterOptions = {
   localidades: [],
    bodegas: [],
    regiones:[],
    zonas: [],
    ruta: [],
    clasificaciones: [],
    claveLista: [],
    canal: [],
}

export const useWarehouseTableStore = create<WarehouseTableState>()(
  immer((set) => ({
    filters: {},
    filterOptions: emptyOptions,
    page: 0,
    pageSize: 50,
    total: 0,
    isFilterLoading: false,
    firstSelectedFilter: { key: null, value: null },

    setPagination: (page, size) => set(() => ({ page, pageSize: size })),
        setTotal: (t) => set(() => ({ total: t })),
        patchFilters: (patch) =>
          set((state) => {
            state.filters = { ...state.filters, ...patch };
          }),
        resetFilters: () =>
          set((state) => {
            state.filters = {};
            state.firstSelectedFilter = { key: null, value: null };
          }),
        setFilterOptions: (opt) => set(() => ({ filterOptions: opt })),
        setFilterLoading: (flag) => set(() => ({ isFilterLoading: flag })),
        setFirstSelected: (key, value) =>
          set(() => ({ firstSelectedFilter: { key, value } })),
      
           resetFirstSelected: () =>
        set({ firstSelectedFilter: { key: null, value: null } }),
      }))
);

