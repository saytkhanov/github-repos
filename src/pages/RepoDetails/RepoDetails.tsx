import { useLoaderData } from "react-router-dom";
import { Error } from "@/shared/ui/components/Error";
import "./RepoDetails.css";
import { RepositoryData } from "@/entities/repo/ui/RepoList/types.ts";

export const RepoDetails = () => {
  const { repository } = useLoaderData() as { repository: RepositoryData };

  if (!repository) {
    return <Error message="Repository not found" />;
  }

  return (
    <div className="repo-details">
      <button className="back-button" onClick={() => window.history.back()}>
        Back
      </button>
      <h2>{repository.name}</h2>
      <p>
        {repository.stargazerCount} stars - Last updated:{" "}
        {new Date(repository.updatedAt).toLocaleDateString()}
      </p>
      <div className="owner">
        <img src={repository.owner.avatarUrl} alt={repository.owner.login} />
        <a
          href={`https://github.com/${repository.owner.login}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {repository.owner.login}
        </a>
      </div>
      <h3>Languages</h3>
      <ul>
        {repository.languages.nodes.map((lang: any) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <p>{repository.description}</p>
    </div>
  );
};
