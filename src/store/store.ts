import { create } from 'zustand';

interface StoreState {
  user: string | null;
  setUser: (user: string) => void;
}

const useStore = create<StoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useStore;
