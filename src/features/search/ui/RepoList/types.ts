export interface RepoOwner {
  login: string;
  avatarUrl: string;
}

export interface Repository {
  id: string;
  name: string;
  stargazerCount: number;
  updatedAt: string;
  url: string;
  owner: RepoOwner;
}
