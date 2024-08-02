import React from "react";
import { Link } from "react-router-dom";
import { Repository } from "./types";

interface RepoListRowProps {
  repo: Repository;
}

export const RepoListRow: React.FC<RepoListRowProps> = React.memo(({ repo }) => {
  return (
    <tr>
      <td className="name">
        <Link to={`/repo/${repo.owner.login}/${repo.name}`}>{repo.name}</Link>
      </td>
      <td className="stars">{repo.stargazerCount}</td>
      <td className="updated">
        {new Date(repo.updatedAt).toLocaleDateString()}
      </td>
      <td className="link">
        <a href={repo.url} target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      </td>
    </tr>
  );
});
