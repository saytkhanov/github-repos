import { create } from "zustand";

import { Repository } from "@/entities/repo/ui/RepoList/types.ts";
import client, { SEARCH_REPOS } from "@/shared/api/github.ts";

export interface State {
  searchTerm: string;
  filter: string;
  page: number;
  repos: Repository[];
  loading: boolean;
  error: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
  setSearchTerm: (term: string) => void;
  setFilter: (filter: string) => void;
  setPage: (page: number) => void;
  fetchRepositories: () => void;
}

export const useStore = create<State>((set, get) => ({
  searchTerm: "",
  filter: "",
  page: 1,
  repos: [],
  loading: false,
  error: null,
  endCursor: null,
  hasNextPage: true,
  setSearchTerm: term => set({ searchTerm: term, page: 1, endCursor: null }),
  setFilter: filter => set({ filter, page: 1, endCursor: null }),
  setPage: page => set({ page }),
  fetchRepositories: async () => {
    const { searchTerm, filter, page, endCursor } = get();
    set({ loading: true, error: null });

    try {
      const { data } = await client.query({
        query: SEARCH_REPOS,
        variables: {
          query: `${searchTerm} ${filter} sort:stars`.trim(),
          first: 10,
          after: page === 1 ? null : endCursor,
        },
      });

      const repos = data.search.edges.map((edge: any) => edge.node);
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
