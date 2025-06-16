import { create } from 'zustand';
import { DashboardFilterOptions } from '../../../shared/types/dashboard.types';

interface CustomerTableState {
    filters: Record<string, any>;
    page: number;
    pageSize: number;
    total: number;
    initialFilterOptions: DashboardFilterOptions | null;
    initialFiltersLoaded: boolean;
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
    setFilters: (filters: Record<string, any>) => void;
    resetFilters: () => void;
    setTotal: (total: number) => void;
    setInitialFilterOptions: (options: DashboardFilterOptions) => void;
}

export const useCustomerTableStore = create<CustomerTableState>((set) => ({
    filters: { viewMode: 'CUSTOMER' },
    page: 0,
    pageSize: 50,
    total: 0,
    initialFilterOptions: null,
    initialFiltersLoaded: false,
    setPage: (page) => set((state) => (state.page !== page ? { page } : state)),
    setPageSize: (size) => set((state) => (state.pageSize !== size ? { pageSize: size } : state)),
    setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters },
        initialFiltersLoaded: true
    })),
    resetFilters: () =>
        set({
            filters: { viewMode: 'CUSTOMER' },
            initialFiltersLoaded: false,
        }),
    setTotal: (total) => set({ total }),
    setInitialFilterOptions: (options) =>
        set({ initialFilterOptions: options }),
}));