import { State } from "./store.ts";

export const selectSearchTerm = (state: State) => state.searchTerm;
export const selectFilter = (state: State) => state.filter;
export const selectPage = (state: State) => state.page;
export const selectRepos = (state: State) => state.repos;
export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectHasNextPage = (state: State) => state.hasNextPage;
export const selectSetSearchTerm = (state: State) => state.setSearchTerm;
export const selectSetFilter = (state: State) => state.setFilter;
export const selectSetPage = (state: State) => state.setPage;
export const selectFetchRepositories = (state: State) =>
  state.fetchRepositories;
