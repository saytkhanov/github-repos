export interface RepoOwner {
  login: string;
  avatarUrl: string;
}

export interface RepositoryData {
  owner: RepoOwner;
  name: string;
  stargazerCount: number;
  updatedAt: string;
  url: string;
  description: string;
  languages: {
    nodes: { name: string }[];
  };
}

