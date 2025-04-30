import { create } from 'zustand';

interface WarehouseTableState {
  filters: Record<string, any>;
  page: number;
  pageSize: number;
  total: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setFilters: (filters: Record<string, any>) => void;
  resetFilters: () => void;
  setTotal: (total: number) => void;
  setPagination: (page: number, size: number) => void; // ✅ add this
}

export const useWarehouseTableStore = create<WarehouseTableState>((set) => ({
  filters: {},
  page: 0,
  pageSize: 50,
  total: 0,
  setPage: (page) => set({ page }),
  setPageSize: (size) => set({ pageSize: size }),
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: {} }),
  setTotal: (total) => set({ total }),
  setPagination: (page, size) => set({ page, pageSize: size }), // ✅ add this
}));
