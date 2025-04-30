import { create } from 'zustand';

interface CustomerTableState {
    filters: Record<string, any>;
    page: number;
    pageSize: number;
    total:number;
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
    setFilters: (filters: Record<string, any>) => void;
    resetFilters: () => void;
    setTotal: (total: number) => void;

}

export const useCustomerTableStore = create<CustomerTableState>((set) => ({
    filters: { viewMode: 'CUSTOMER' },
    page: 0,
    pageSize: 50,
    total: 0,
    setPage: (page) => set({ page }),
    setPageSize: (size) => set({ pageSize: size }),
    setFilters: (filters) => set({ filters }),
    resetFilters: () => set({ filters: { viewMode: 'CUSTOMER' } }),
    setTotal: (total) => set({ total }),
}));