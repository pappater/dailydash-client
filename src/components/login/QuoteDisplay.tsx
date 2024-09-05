// QuoteDisplay.tsx

import React, { useState, useEffect } from "react";
import quotesData from "../../data/quotes.json"; // Adjust the path as necessary

const QuoteDisplay: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<{
    quote: string;
    author: string;
  } | null>(null);

  useEffect(() => {
    const updateQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotesData.length);
      setCurrentQuote(quotesData[randomIndex]);
    };

    updateQuote();
    const interval = setInterval(updateQuote, 5000); // Update quote every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="relative w-full h-full flex items-center overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center p-8 overflow-auto">
        <div className="flex flex-col justify-center items-center max-w-md p-8  overflow-auto h-full">
          {currentQuote && (
            <div className="flex flex-col items-centre justify-center text-left h-full">
              <p className="text-7xl font-semibold mb-4 whitespace-pre-wrap">
                {currentQuote.quote}
              </p>
              <p className="text-lg text-right">{`— ${currentQuote.author}`}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteDisplay;
