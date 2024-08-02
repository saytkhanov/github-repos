import { FC } from "react";

import "./RepoList.css";
import { Repository } from "./types.ts";

import { RepoListRow } from "./RepoListRow.tsx";
import { RepoListSkeleton } from "./RepoListSkeleton.tsx";

interface RepoListProps {
  repos: Repository[];
  loading: boolean;
}

export const RepoList: FC<RepoListProps> = ({ repos, loading }) => {
  return (
    <table className="repo-list">
      <thead>
        <tr>
          <th className="name">Name</th>
          <th className="stars">Stars</th>
          <th className="updated">Last Updated</th>
          <th className="link">Link</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <RepoListSkeleton />
        ) : (
          repos.map(repo => <RepoListRow key={repo.id} repo={repo} />)
        )}
      </tbody>
    </table>
  );
};