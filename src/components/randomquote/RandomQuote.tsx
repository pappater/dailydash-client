import { useFetchRandomQuote } from "@/hooks/useFetchRandomQuote";
import useStore from "@/store/store"; // Import your store or context for theme

const RandomQuote = () => {
  const { data: quote, isLoading, isError, error } = useFetchRandomQuote();
  const { isDarkMode } = useStore(); // Access dark mode from store or context

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div
      className={`w-full h-full p-6 rounded-xl shadow-lg ${
        isDarkMode ? "bg-neutral-900 text-white" : "bg-white text-black"
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-4 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Random Thoughts
      </h2>
      {quote ? (
        <div className="relative">
          {quote.image && (
            <img
              src={quote.image}
              alt={quote.author}
              className={`w-32 h-32 object-cover rounded-lg float-right ml-4 mb-4 ${
                isDarkMode ? "border-gray-600" : "border-gray-300"
              }`}
            />
          )}
          <div className="text-wrap">
            <p
              className={`text-xl mb-2 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              "{quote.quote}"
            </p>
            <p
              className={`text-lg mb-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              - {quote.author}
            </p>
          </div>
          <a
            href="https://niche-psi.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-semibold underline ${
              isDarkMode
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-500"
            }`}
          >
            Read more
          </a>
        </div>
      ) : (
        <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          No quote available
        </p>
      )}
    </div>
  );
};

export default RandomQuote;
