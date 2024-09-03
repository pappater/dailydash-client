import { create } from "zustand";

interface StoreState {
  user: User | null;
  text: string;
  isDarkMode: boolean;
  widgets: { type: string; id: number }[];
  setUser: (user: User | null) => void;
  setText: (text: string) => void;
  setDarkMode: (isDarkMode: boolean) => void;
  addWidget: (widgetType: string) => void;
  removeWidget: (id: number) => void;
}

const useStore = create<StoreState>((set) => ({
  user: null,
  text: "",
  isDarkMode: false,
  widgets: [],
  setUser: (user) => set({ user }),
  setText: (text) => set({ text }),
  setDarkMode: (isDarkMode) => set({ isDarkMode }),
  addWidget: (widgetType) =>
    set((state) => ({
      widgets: [...state.widgets, { type: widgetType, id: Date.now() }],
    })),
  removeWidget: (id) =>
    set((state) => ({
      widgets: state.widgets.filter((widget) => widget.id !== id),
    })),
}));

export default useStore;

interface User {
  id: string;
  displayName: string;
  emails: { value: string }[];
}
