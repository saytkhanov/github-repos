export interface RepositoryNode {
  id: string;
  name: string;
  stargazerCount: number;
  updatedAt: string;
  url: string;
  owner: {
    login: string;
    avatarUrl: string;
  };
}

export interface RepoState {
  searchTerm: string;
  page: number;
  repos: RepositoryNode[];
  loading: boolean;
  error: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
  setSearchTerm: (term: string) => void;
  setPage: (page: number) => void;
  fetchRepositories: () => void;
}
