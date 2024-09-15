import { useFetchStockData } from "@/hooks/useStockData";
import StockTabs from "./StockTabs";

const StockComponent = () => {
  // const prompt = "gold rate"; // Example prompt
  // const { data } = useFetchStockData("TCS");
  // console.log("dataatatat", data);

  return (
    <div className="stock-container">
      <StockTabs />
    </div>
  );
};

export default StockComponent;
