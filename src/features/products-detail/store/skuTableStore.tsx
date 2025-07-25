import { create } from 'zustand';


interface SkuTableState {
  filters: Record<string, any>;
  page: number;
  pageSize: number;
  total: number;
  bodega?: number;
  cliente?: number;
  clave_lista?: string; // Es mejor usar string si puede ser nulo o un valor
  noDataNotified: boolean; // <-- 1. AÑADE ESTE ESTADO
  setPagination: (page: number, size: number) => void;
  setFilters: (filters: Record<string, any>) => void;
  resetFilters: () => void;
  setTotal: (total: number) => void;
  setBodega: (bodega?: number) => void;
  setCliente: (cliente?: number) => void;
  setClaveLista: (clave_lista?: string) => void;
  setNoDataNotified: (notified: boolean) => void; // <-- 2. AÑADE ESTA ACCIÓN
}

export const useSkuTableStore = create<SkuTableState>((set) => ({
  filters: {},
  page: 0,
  pageSize: 50,
  total: 0,
  bodega: undefined,
  cliente: undefined,
  clave_lista: undefined,
  noDataNotified: false, // <-- Valor inicial

  setPagination: (page, size) => set({ page, pageSize: size }),
  setFilters: (filters) => set({ filters, page: 0, noDataNotified: false }),
  resetFilters: () => set({ filters: {}, page: 0, noDataNotified: false }),
  setTotal: (total) => set({ total }),

  // 3. ¡CLAVE! Reinicia la notificación al cambiar los identificadores de la búsqueda.
  setBodega: (bodega) => set({ bodega, page: 0, noDataNotified: false }),
  setCliente: (cliente) => set({ cliente, page: 0, noDataNotified: false }),
  setClaveLista: (clave_lista) => set({ clave_lista, page: 0, noDataNotified: false }),

  setNoDataNotified: (notified) => set({ noDataNotified: notified }), // <-- Implementación
}));