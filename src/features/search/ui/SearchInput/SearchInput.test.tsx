import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useStore } from "@/entities/repo/model/store.ts";
import { SearchInput } from "./SearchInput.tsx";

jest.mock("@/entities/repo/model/store.ts", () => ({
  useStore: jest.fn() as any,
}));

describe("SearchInput", () => {
  it("renders correctly and updates the search term", () => {
    const setSearchTerm = jest.fn();
    const fetchRepositories = jest.fn();

    (useStore as unknown as jest.Mock).mockReturnValue({
      searchTerm: "",
      setSearchTerm,
      fetchRepositories,
    });

    render(<SearchInput />);

    const input = screen.getByPlaceholderText("Search repositories");
    fireEvent.change(input, { target: { value: "test" } });

    expect(setSearchTerm).toHaveBeenCalledWith("test");
  });

  it("fetches repositories after debounce", async () => {
    jest.useFakeTimers();

    const setSearchTerm = jest.fn();
    const fetchRepositories = jest.fn();

    (useStore as unknown as jest.Mock).mockReturnValue({
      searchTerm: "test",
      setSearchTerm,
      fetchRepositories,
    });

    render(<SearchInput />);

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(fetchRepositories).toHaveBeenCalled();
    });

    jest.useRealTimers();
  });
});
