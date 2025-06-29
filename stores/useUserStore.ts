// stores/useUserStore.ts
import { create } from "zustand";

interface User {
  fullname: string;
  class: string;
  role: string;
  status: string;
  email: string;
  reg_number?: string;
  parent_phone?: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
export const useUser = () => {
  const { user, setUser, clearUser } = useUserStore();
  return { user, setUser, clearUser };
};
