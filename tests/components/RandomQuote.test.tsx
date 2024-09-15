import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useFetchRandomQuote } from "@/hooks/useFetchRandomQuote";
import useStore from "@/store/store";
import RandomQuote from "@/components/randomquote/RandomQuote";

// Define the types for mocking
interface Quote {
  author: string;
  quote: string;
  image: string;
}

// Mock the hooks used in the component
jest.mock("@/hooks/useFetchRandomQuote");
jest.mock("@/store/store");

const mockUseFetchRandomQuote = useFetchRandomQuote as jest.MockedFunction<
  typeof useFetchRandomQuote
>;
const mockUseStore = useStore as jest.MockedFunction<typeof useStore>;

describe("RandomQuote Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.resetAllMocks();
  });

  test("displays loading state", () => {
    mockUseFetchRandomQuote.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
    });
    mockUseStore.mockReturnValue({ isDarkMode: false });

    render(<RandomQuote />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("displays error state", () => {
    mockUseFetchRandomQuote.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { name: "Error", message: "Failed to fetch" }, // Added 'name' property
    });
    mockUseStore.mockReturnValue({ isDarkMode: false });

    render(<RandomQuote />);
    expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument();
  });

  test("renders quote and image in dark mode", async () => {
    const mockQuote: Quote = {
      quote: "This is a quote",
      author: "Author",
      image: "/path/to/image.jpg",
    };
    mockUseFetchRandomQuote.mockReturnValue({
      data: mockQuote,
      isLoading: false,
      isError: false,
      error: null,
    });
    mockUseStore.mockReturnValue({ isDarkMode: true });

    render(<RandomQuote />);

    // Check quote text and author
    expect(screen.getByText(/"This is a quote"/i)).toBeInTheDocument();
    expect(screen.getByText(/- Author/i)).toBeInTheDocument();

    // Check image presence
    const img = screen.getByAltText(/Author/i) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("/path/to/image.jpg");

    // Check dark mode styles
    expect(screen.getByText(/Random Thoughts/i)).toHaveClass("text-white");
    expect(img).toHaveClass("border-gray-600");
  });

  test("renders quote and image in light mode", async () => {
    const mockQuote: Quote = {
      quote: "This is a quote",
      author: "Author",
      image: "/path/to/image.jpg",
    };
    mockUseFetchRandomQuote.mockReturnValue({
      data: mockQuote,
      isLoading: false,
      isError: false,
      error: null,
    });
    mockUseStore.mockReturnValue({ isDarkMode: false });

    render(<RandomQuote />);

    // Check quote text and author
    expect(screen.getByText(/"This is a quote"/i)).toBeInTheDocument();
    expect(screen.getByText(/- Author/i)).toBeInTheDocument();

    // Check image presence
    const img = screen.getByAltText(/Author/i) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("/path/to/image.jpg");

    // Check light mode styles
    expect(screen.getByText(/Random Thoughts/i)).toHaveClass("text-black");
    expect(img).toHaveClass("border-gray-300");
  });

  test("displays no quote available message", () => {
    mockUseFetchRandomQuote.mockReturnValue({
      data: null as Quote | null,
      isLoading: false,
      isError: false,
      error: null,
    });
    mockUseStore.mockReturnValue({ isDarkMode: false });

    render(<RandomQuote />);
    expect(screen.getByText(/No quote available/i)).toBeInTheDocument();
  });
});
