import React from "react";

import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

import { RepoDetailsSkeleton } from "@/pages/RepoDetails/components/RepoDetailsSkeleton";
import { RepoLanguages } from "@/pages/RepoDetails/components/RepoLanguages";
import { GET_REPO_DETAILS } from "@/shared/api/github";
import { Error } from "@/shared/ui/components/Error";
import "./RepoDetails.css";

export const RepoDetails: React.FC = () => {
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_REPO_DETAILS, {
    variables: { owner, name },
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  const renderContent = () => {
    if (loading) return <RepoDetailsSkeleton />;
    if (error) return <Error message={error.message} />;
    if (!data || !data.repository)
      return <Error message="Repository not found" />;

    const { repository } = data;

    return (
      <>
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
        <RepoLanguages languages={repository.languages.nodes} />
        <p>{repository.description}</p>
      </>
    );
  };

  return (
    <div className="repo-details">
      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>
      {renderContent()}
    </div>
  );
};
