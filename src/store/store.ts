import { create } from "zustand";

interface StoreState {
  user: User | null;
  text: string;
  isDarkMode: boolean;
  setUser: (user: User | null) => void;
  setText: (text: string) => void;
  setDarkMode: (isDarkMode: boolean) => void;
}

const useStore = create<StoreState>((set) => ({
  user: null,
  text: "",
  isDarkMode: false,
  setUser: (user) => set({ user }),
  setText: (text) => set({ text }),
  setDarkMode: (isDarkMode) => set({ isDarkMode }),
}));

export default useStore;

interface User {
  id: string;
  displayName: string;
  emails: { value: string }[];
}
