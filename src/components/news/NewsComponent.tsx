import { useFetchNewsData } from "@/hooks/useNewsFeed";
import NewsTabs from "./NewsTabs";

const NewsComponent: React.FC = () => {
  const { data: generalNews } = useFetchNewsData("general");
  const { data: techNews } = useFetchNewsData("technology");
  const { data: businessNews } = useFetchNewsData("business");

  return (
    <div className="news-container">
      <NewsTabs
        generalNews={generalNews}
        techNews={techNews}
        businessNews={businessNews}
      />
    </div>
  );
};

export default NewsComponent;
