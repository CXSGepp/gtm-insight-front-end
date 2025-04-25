// src/layouts/store/layoutStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LayoutState {
  sidebarOpen: boolean;
  currentView: 'customer' | 'warehouse' | 'products';
  toggleSidebar: () => void;
  setCurrentView: (view: LayoutState['currentView']) => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      currentView: 'customer',
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setCurrentView: (view) => set({ currentView: view }),
    }),
    {
      name: 'layout-store',
    }
  )
);