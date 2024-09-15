import { useQuery } from "react-query";
import axios from "axios";

// Define the structure of news articles
interface NewsArticle {
  title: string;
  description: string;
  url: string;
}

interface NewsResponse {
  articles: NewsArticle[];
}

const fetchNewsData = async (category: string): Promise<NewsArticle[]> => {
  const apiKey = "d1738509cd8c4b7e8a90b696529e6275";
  console.log("category", category);

  const url = `https://newsapi.org/v2/everything?q=business&apiKey=${apiKey}`;

  try {
    const { data } = await axios.get<NewsResponse>(url);
    return data.articles;
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw error;
  }
};

export const useFetchNewsData = (category: string) => {
  return useQuery<NewsArticle[], Error>(["newsData", category], () =>
    fetchNewsData(category)
  );
};
