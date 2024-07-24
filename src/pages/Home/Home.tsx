import { useEffect, FC } from "react";

import { useStore } from "@/features/search/model/store";
import { Paginator } from "@/features/search/ui/Paginator";
import { RepoList } from "@/features/search/ui/RepoList/RepoList";
import { SearchInput } from "@/features/search/ui/SearchInput";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { Error } from "@/shared/ui/components/Error";
import "./Home.css";

export const Home: FC = () => {
  const {
    searchTerm,
    page,
    repos,
    loading,
    error,
    fetchRepositories,
    setSearchTerm,
    setPage,
    hasNextPage,
  } = useStore(state => ({
    searchTerm: state.searchTerm,
    page: state.page,
    repos: state.repos,
    loading: state.loading,
    error: state.error,
    fetchRepositories: state.fetchRepositories,
    setSearchTerm: state.setSearchTerm,
    setPage: state.setPage,
    hasNextPage: state.hasNextPage,
  }));

  const [storedSearchTerm, setStoredSearchTerm] = useLocalStorage<string>(
    "searchTerm",
    "",
  );
  const [storedPage, setStoredPage] = useLocalStorage<number>("page", 1);

  useEffect(() => {
    // Synchronize local storage with store
    setSearchTerm(storedSearchTerm);
    setPage(storedPage);
  }, [setSearchTerm, setPage, storedSearchTerm, storedPage]);

  useEffect(() => {
    // Fetch repositories when searchTerm or page changes
    if (searchTerm.trim()) {
      fetchRepositories();
    }
  }, [searchTerm, page, fetchRepositories]);

  useEffect(() => {
    // Update local storage on searchTerm or page change
    setStoredSearchTerm(searchTerm);
    setStoredPage(page);
  }, [searchTerm, page, setStoredSearchTerm, setStoredPage]);

  return (
    <div className="home-container">
      <h1 className="title">Search Repositories</h1>
      <SearchInput />
      {error && <Error message={error} />}
      {repos.length > 0 && (
        <>
          <RepoList repos={repos} loading={loading} />
          <Paginator currentPage={page} hasNextPage={hasNextPage} />
        </>
      )}
    </div>
  );
};
