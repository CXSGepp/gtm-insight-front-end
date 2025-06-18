// src/features/discounts-detail/store/discountTableStore.ts
import { create } from 'zustand';

interface DiscountTableState {
  filters: Record<string, any>;
  page: number;
  pageSize: number;
  total: number;
  bodega?: number;
  cliente?: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setPagination: (page: number, size: number) => void;
  setFilters: (filters: Record<string, any>) => void;
  resetFilters: () => void;
  setTotal: (total: number) => void;
  setBodega: (bodega: number) => void;
  setCliente: (cliente: number) => void;
}

export const useDiscountTableStore = create<DiscountTableState>((set) => ({
  filters: {},
  page: 0,
  pageSize: 50,
  total: 0,
  bodega: undefined,
  cliente: undefined,
  setBodega: (bodega) => set({ bodega }),
  setCliente: (cliente) => set({ cliente }),
  setPage: (page) => set({ page }),
  setPageSize: (size) => set({ pageSize: size }),
  setPagination: (page, size) => set({ page, pageSize: size }),
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: {} }),
  setTotal: (total) => set({ total }),
}));