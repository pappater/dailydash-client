import create from "zustand";
import axios from "axios";

interface StockState {
  stocks: Record<string, any>;
  fetchStockData: (symbol: string) => Promise<void>;
}

export const useStockStore = create<StockState>((set) => ({
  stocks: {},
  fetchStockData: async (symbol: string) => {
    try {
      const response = await axios.get(`/api/stocks?symbol=${symbol}`);
      set((state) => ({
        stocks: { ...state.stocks, [symbol]: response.data },
      }));
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  },
}));
