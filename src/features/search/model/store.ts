import { create } from "zustand";

import { RepoState, RepositoryNode } from "../types/repository";

import client, { SEARCH_REPOS } from "@/shared/api/github";

export const useStore = create<RepoState>((set, get) => ({
  searchTerm: "",
  page: 1,
  repos: [],
  loading: false,
  error: null,
  endCursor: null,
  hasNextPage: true,
  setSearchTerm: (term: string) =>
    set({ searchTerm: term, page: 1, endCursor: null }),
  setPage: (page: number) => set({ page }),
  fetchRepositories: async () => {
    const { searchTerm, page, endCursor } = get();
    set({ loading: true, error: null });

    try {
      const { data } = await client.query({
        query: SEARCH_REPOS,
        variables: {
          query: searchTerm,
          first: 10,
          after: page === 1 ? null : endCursor,
        },
      });

      const repos = data.search.edges.map(
        (edge: { node: RepositoryNode }) => edge.node,
      );
      const newEndCursor = data.search.pageInfo.endCursor;
      const hasNextPage = data.search.pageInfo.hasNextPage;

      set({
        repos,
        loading: false,
        endCursor: newEndCursor,
        hasNextPage,
      });
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: String(error), loading: false });
      }
    }
  },
}));
