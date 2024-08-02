import { renderHook, act } from "@testing-library/react";

import { RepositoryNode } from "../../../features/search/types/repository.ts";

import { useStore } from "./store.ts";

import client from "@/shared/api/github.ts";

describe("useStore", () => {
  it("should update search term", () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.setSearchTerm("test");
    });

    expect(result.current.searchTerm).toBe("test");
  });

  it("should update page", () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.page).toBe(2);
  });

  it("should fetch repositories and handle state updates", async () => {
    const { result } = renderHook(() => useStore());

    // Mock the fetchRepositories function
    const mockRepositories: RepositoryNode[] = [
      {
        id: "1",
        name: "Repo1",
        stargazerCount: 10,
        updatedAt: "2024-01-01T00:00:00Z",
        url: "https://github.com/repo1",
        owner: {
          login: "owner1",
          avatarUrl: "https://avatar.com/owner1",
        },
      },
    ];

    (client.query as jest.Mock).mockResolvedValue({
      data: {
        search: {
          edges: mockRepositories.map(repo => ({ node: repo })),
          pageInfo: {
            endCursor: "nextCursor",
            hasNextPage: false,
          },
        },
      },
    });

    await act(async () => {
      result.current.fetchRepositories();
    });

    expect(result.current.repos).toEqual(mockRepositories);
    expect(result.current.endCursor).toBe("nextCursor");
    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.loading).toBe(false);
  });
});
