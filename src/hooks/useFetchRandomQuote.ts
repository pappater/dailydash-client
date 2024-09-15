import { useQuery } from "react-query";
import api from "@/services/api";

// Define the structure of a quote
interface Quote {
  author: string;
  quote: string;
  image: string;
}

// Fetch a random quote from the server
const fetchRandomQuote = async (): Promise<Quote> => {
  const { data } = await api.get<Quote>("/scrape/randomQuote");
  return data;
};

// Custom hook to fetch random quotes with better query configuration
export const useFetchRandomQuote = () => {
  return useQuery<Quote, Error>("randomQuote", fetchRandomQuote, {
    staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Cache the data for 10 minutes
    refetchOnWindowFocus: false, // Don't refetch on window focus
  });
};
