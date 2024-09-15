import { useQuery } from "react-query";
import { fetchStockData } from "@/services/api";

// Custom hook for fetching data
export const useFetchStockData = (symbol: string) => {
  return useQuery(["stockData", symbol], () => fetchStockData(symbol), {
    // Optional settings
    staleTime: 5 * 60 * 1000, // Keep data fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Cache the data for 10 minutes
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });
};
