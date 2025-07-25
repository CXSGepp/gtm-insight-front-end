import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface LayoutState {
  sidebarOpen: boolean;
  activeRoute: string;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  // 1. Añade la definición de la nueva función a la interfaz
  openSidebar: () => void;
  closeSidebar: () => void;
  setActiveRoute: (route: string) => void;
}

export const useLayoutStore = create<LayoutState>()(
  devtools(
    persist(
      (set) => ({
        sidebarOpen: true,
        activeRoute: '/',
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        setSidebarOpen: (open) => set({ sidebarOpen: open }),
        openSidebar: () => set({ sidebarOpen: true }),
        closeSidebar: () => set({ sidebarOpen: false }),
        setActiveRoute: (route) => set({ activeRoute: route }),
      }),
      {
        name: 'layout-storage',
      }
    )
  )
);