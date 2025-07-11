import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

interface User {
  fullname: string;
  class: string;
  role: string;
  status?: string;
  email: string;
  reg_number?: string;
  parent_phone?: string;
  phone?: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const EXPIRY_TIME = 3 * 24 * 60 * 60 * 1000; // 3 days

const customStorage: PersistStorage<UserStore> = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;

    try {
      const parsed = JSON.parse(str);
      if (!parsed.timestamp || Date.now() - parsed.timestamp > EXPIRY_TIME) {
        localStorage.removeItem(name);
        return null;
      }
      return parsed; // ✅ Zustand expects { state, version }
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    const withExpiry = {
      ...value,
      timestamp: Date.now(),
    };
    localStorage.setItem(name, JSON.stringify(withExpiry));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: customStorage,
    }
  )
);

export const useUser = () => {
  const { user, setUser, clearUser } = useUserStore();
  return { user, setUser, clearUser };
};
