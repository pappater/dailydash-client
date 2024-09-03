import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import useStore from "../../src/store/store";
import Login from "../../src/pages/Login";

// Mock the useStore hook to control its return value in tests
jest.mock("../../src/store/store");

// Type the mocked useStore function
const mockUseStore = useStore as jest.MockedFunction<typeof useStore>;

describe("Login Component", () => {
  // Before each test, set up the default return value for the mocked useStore hook
  beforeEach(() => {
    mockUseStore.mockReturnValue({ isDarkMode: false });
    // Mock window.location object properties directly
    delete (window as any).location;
    (window as any).location = {
      href: "",
      assign: jest.fn(), // Mock function for location.assign
      replace: jest.fn(), // Mock function for location.replace
    };
  });

  // Test to verify that the DailyDash title is rendered
  test("renders the DailyDash title", () => {
    render(<Login />); // Render the Login component
    const titleElement = screen.getByText(/DailyDash/i); // Find the title element by text
    expect(titleElement).toBeInTheDocument(); // Assert that the title is in the document
  });

  // Test to verify that the Google Sign-In button is rendered
  test("renders the Google Sign-In button", () => {
    render(<Login />); // Render the Login component
    const buttonElement = screen.getByText(/Sign in with Google/i); // Find the button element by text
    expect(buttonElement).toBeInTheDocument(); // Assert that the button is in the document
  });

  // Test to verify that clicking the button redirects to the Google sign-in URL
  test("button redirects to Google sign-in", () => {
    render(<Login />); // Render the Login component
    const buttonElement = screen.getByText(/Sign in with Google/i); // Find the button element by text
    fireEvent.click(buttonElement); // Simulate a click event on the button
    expect(window.location.href).toBe("http://localhost:5001/api/auth/google"); // Assert that the URL was set correctly
  });

  // Test to verify that dark mode styles are applied when isDarkMode is true
  test("applies dark mode styles", () => {
    mockUseStore.mockReturnValue({ isDarkMode: true }); // Change the mock return value to enable dark mode
    const { container } = render(<Login />); // Render the Login component
    expect(container.firstChild).toHaveClass("bg-dark"); // Assert that the container has the dark mode class
  });
});
