import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      dark: false,
      toggle: () => set(s => {
        const next = !s.dark;
        if (next) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        return { dark: next };
      }),
    }),
    { name: 'jiva-theme' }
  )
);

export const useSidebarStore = create((set) => ({
  open: true,
  mobileOpen: false,
  toggle: () => set(s => ({ open: !s.open })),
  toggleMobile: () => set(s => ({ mobileOpen: !s.mobileOpen })),
  closeMobile: () => set({ mobileOpen: false }),
}));

export const useUsersStore = create((set) => ({
  users: [],
  loading: false,
  setUsers: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),
  addUser: (user) => set(s => ({ users: [...s.users, user] })),
  updateUser: (id, data) => set(s => ({ users: s.users.map(u => u.id === Number(id) ? { ...u, ...data } : u) })),
  removeUser: (id) => set(s => ({ users: s.users.filter(u => u.id !== Number(id)) })),
}));
