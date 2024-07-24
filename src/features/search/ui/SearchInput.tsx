import { FC, useEffect } from "react";

import { useStore } from "../model/store";

import { useDebounce } from "@/shared/hooks/useDebounce";

export const SearchInput: FC = () => {
  const { searchTerm, setSearchTerm, fetchRepositories } = useStore(state => ({
    searchTerm: state.searchTerm,
    setSearchTerm: state.setSearchTerm,
    fetchRepositories: state.fetchRepositories,
  }));

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

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
