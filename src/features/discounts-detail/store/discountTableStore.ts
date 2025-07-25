import { create } from 'zustand';

interface DiscountTableState {
  filters: Record<string, any>;
  page: number;
  pageSize: number;
  noDataNotified: boolean;
  setPagination: (page: number, size: number) => void;
  patchFilters: (patch: Record<string, any>) => void;
  resetFilters: () => void;
  setNoDataNotified: (notified: boolean) => void;
}

export const useDiscountTableStore = create<DiscountTableState>((set) => ({
  filters: {},
  page: 0,
  pageSize: 50,
  noDataNotified: false,

  setPagination: (page, pageSize) => set({ page, pageSize }),

  patchFilters: (patch) =>
    set((state) => ({
      filters: { ...state.filters, ...patch },
      page: 0,
      noDataNotified: false,
    })),

  resetFilters: () =>
    set({
      filters: {},
      page: 0,
      noDataNotified: false,
    }),

  setNoDataNotified: (notified) => set({ noDataNotified: notified }),
}));