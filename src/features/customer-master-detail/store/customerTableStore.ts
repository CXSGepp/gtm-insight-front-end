import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { DashboardFilters, DashboardFilterOptions  } from '../../../shared/types/dashboard.types';

interface CustomerTableState {
    /* Datta */
    filters: DashboardFilters;
    filterOptions: DashboardFilterOptions; 
    /* ui */
    page: number;
    pageSize: number;
    total: number;
    isFilterLoading: boolean;
    /* helpers */
    firstSelectedFilter: { key: string | null; value: any | null };
    /* setters */
    noDataNotified: boolean;
    setPagination: (page: number, size: number) => void;
    setTotal: (t: number) => void;
    patchFilters: (patch: Partial<DashboardFilters>) => void;
    resetFilters: () =>  void;
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


export const useCustomerDashboardStore = create<CustomerTableState>()(
  immer((set) => ({
    filters: {},
    filterOptions: emptyOptions,
    page: 0,
    pageSize: 50,
    total: 0,
    isFilterLoading: false,
    firstSelectedFilter: { key: null, value: null },
    noDataNotified: false,
    setPagination: (page, size) => set(() => ({ page, pageSize: size })),
    setTotal: (t) => set(() => ({ total: t })),
    patchFilters: (patch) =>
      set((state) => {
        state.filters = { ...state.filters, ...patch };
        state.page = 0;
        state.noDataNotified = false; 
      }),
    resetFilters: () =>
      set((state) => {
        state.filters = {};
        state.firstSelectedFilter = { key: null, value: null };
        state.page = 0;
        state.noDataNotified = false; 
      }),
    setFilterOptions: (opt) => set(() => ({ filterOptions: opt })),
    setFilterLoading: (flag) => set(() => ({ isFilterLoading: flag })),
    setFirstSelected: (key, value) =>
      set(() => ({ firstSelectedFilter: { key, value } })),

       resetFirstSelected: () =>
    set({ firstSelectedFilter: { key: null, value: null } }),
    setNoDataNotified: (notified) => set({ noDataNotified: notified }),
  }))

);

