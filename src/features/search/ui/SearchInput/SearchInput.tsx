import { FC, useEffect } from "react";

import { useStore } from "@/entities/repo/model/store.ts";

import { useDebounce } from "@/shared/hooks/useDebounce.ts";

export const SearchInput: FC = () => {
  const { searchTerm, setSearchTerm, fetchRepositories } = useStore(state => ({
    searchTerm: state.searchTerm,
    setSearchTerm: state.setSearchTerm,
    fetchRepositories: state.fetchRepositories,
  }));

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      fetchRepositories();
    }
  }, [debouncedSearchTerm, fetchRepositories]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      placeholder="Search repositories"
    />
  );
};
