import { FC, useEffect, useMemo } from "react";

import * as selectors from "@/entities/repo/model/selectors";
import { useStore } from "@/entities/repo/model/store";
import { Dropdown } from "@/shared/ui/components/Dropdown/Dropdown.tsx";
import { Paginator } from "@/shared/ui/components/Paginator/Paginator.tsx";
import { RepoList } from "@/entities/repo/ui/RepoList/RepoList";
import { RepoListSkeleton } from "@/entities/repo/ui/RepoList/RepoListSkeleton";
import { SearchInput } from "@/features/search/ui/SearchInput/SearchInput.tsx";
import { useSyncLocalStorage } from "@/shared/hooks/useSyncLocalStorage.ts";
import { Error } from "@/shared/ui/components/Error";
import "./Home.css";

export const Home: FC = () => {
  const {
    searchTerm,
    filter,
    page,
    repos,
    loading,
    error,
    hasNextPage,
    setSearchTerm,
    setFilter,
    setPage,
    fetchRepositories,
  } = useStore(state => ({
    searchTerm: selectors.selectSearchTerm(state),
    filter: selectors.selectFilter(state),
    page: selectors.selectPage(state),
    repos: selectors.selectRepos(state),
    loading: selectors.selectLoading(state),
    error: selectors.selectError(state),
    hasNextPage: selectors.selectHasNextPage(state),
    setSearchTerm: selectors.selectSetSearchTerm(state),
    setFilter: selectors.selectSetFilter(state),
    setPage: selectors.selectSetPage(state),
    fetchRepositories: selectors.selectFetchRepositories(state),
  }));

  const filterOptions = useMemo(
    () => [
      { value: "", label: "All" },
      { value: "language:TypeScript", label: "TypeScript" },
      { value: "language:JavaScript", label: "JavaScript" },
      { value: "language:Python", label: "Python" },
    ],
    [],
  );

  useSyncLocalStorage("searchTerm", searchTerm, setSearchTerm);
  useSyncLocalStorage("filter", filter, setFilter);
  useSyncLocalStorage("page", page, setPage);

  useEffect(() => {
    fetchRepositories();
  }, [searchTerm, filter, page, fetchRepositories]);

  return (
    <div className="home-container">
      <h1 className="title">Search Repositories</h1>
      <div className="search-container">
        <SearchInput />
        <Dropdown
          options={filterOptions}
          selectedOption={filter}
          onSelect={setFilter}
        />
      </div>
      {error && <Error message={error} />}
      {loading ? (
        <RepoListSkeleton />
      ) : (
        repos.length > 0 && (
          <>
            <RepoList repos={repos} loading={loading} />
            <Paginator currentPage={page} hasNextPage={hasNextPage} />
          </>
        )
      )}
    </div>
  );
};
