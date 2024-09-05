import { create } from "zustand";
import { saveWidgetConfig } from "@/services/api";

interface User {
  id: string;
  displayName: string;
  emails: { value: string }[];
  photos: { value: string }[];
}

interface DashboardUserData {
  isDarkMode: boolean;
  googleId: string;
  name: string;
  email: string;
  savedData: string;
  widgetConfig: { type: string; id: number };
  calendarEvents: [
    {
      date: string;
      text: string;
      completed: { type: boolean; default: boolean };
    }
  ];
  darkMode: { type: boolean; default: boolean };
}

interface StoreState {
  user: User | null;
  text: string;
  isDarkMode: boolean;
  widgets: { type: string; id: number }[];
  setUser: (user: User | null) => void;
  setText: (text: string) => void;
  setDarkMode: (isDarkMode: boolean) => void;
  setWidgets: (widgets: { type: string; id: number }[]) => void;
  addWidget: (widgetType: string) => void;
  removeWidget: (id: number) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  setDashboardData: (data: DashboardUserData | null) => void;
  dashboardData: DashboardUserData | null;
}

const useStore = create<StoreState>((set, get) => ({
  user: null,
  text: "",
  isDarkMode: false,
  showModal: false,
  widgets: [],
  dashboardData: null,
  setDashboardData: (data) => set({ dashboardData: data }),
  setUser: (user) => set({ user }),
  setText: (text) => set({ text }),
  setDarkMode: (isDarkMode) => set({ isDarkMode }),
  setWidgets: (widgets) => set({ widgets }),
  addWidget: async (widgetType) => {
    const { widgets, user } = get();
    const updatedWidgets = [...widgets, { type: widgetType, id: Date.now() }];

    set({ widgets: updatedWidgets });

    if (user) {
      try {
        await saveWidgetConfig(user.id, { widgets: updatedWidgets });
      } catch (error) {
        console.error("Failed to save widget configuration", error);
      }
    }
  },
  removeWidget: async (id) => {
    const { widgets, user } = get();
    const updatedWidgets = widgets.filter((widget) => widget.id !== id);

    set({ widgets: updatedWidgets });

    if (user) {
      try {
        await saveWidgetConfig(user.id, { widgets: updatedWidgets });
      } catch (error) {
        console.error("Failed to save widget configuration", error);
      }
    }
  },
  setShowModal: (show: boolean) => set({ showModal: show }),
}));

export default useStore;
