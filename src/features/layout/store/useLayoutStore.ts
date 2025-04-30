import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface LayoutState {
  sidebarOpen: boolean;
  activeRoute: string;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
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
        setActiveRoute: (route) => set({ activeRoute: route }),
      }),
      {
        name: 'layout-storage',
      }
    )
  )
);
