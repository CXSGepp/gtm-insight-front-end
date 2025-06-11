import { create } from 'zustand';

interface SkuTableState {
  filters: Record<string, any>;
  page: number;
  pageSize: number;
  total: number;
  bodega?: number;
  cliente?: number;
  clave_lista?: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setPagination: (page: number, size: number) => void;
  setFilters: (filters: Record<string, any>) => void;
  resetFilters: () => void;
  setTotal: (total: number) => void;
  setBodega: (bodega: number) => void;
  setCliente: (cliente: number) => void;
  setClaveLista: (clave_lista: number) => void;
}

export const useSkuTableStore = create<SkuTableState>((set) => ({
  filters: {},
  page: 0,
  pageSize: 50,
  total: 0,
  bodega: undefined,
  cliente: undefined,
  clave_lista: undefined,
  setBodega: (bodega) => set({ bodega }),
  setCliente: (cliente) => set({ cliente }),
  setClaveLista: (clave_lista) => set({ clave_lista}),
  setPage: (page) => set({ page }),
  setPageSize: (size) => set({ pageSize: size }),
  setPagination: (page, size) => set({ page, pageSize: size }),
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: {} }),
  setTotal: (total) => set({ total }),
}));
