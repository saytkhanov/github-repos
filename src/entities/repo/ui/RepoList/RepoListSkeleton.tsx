import React from "react";
import Skeleton from "@/shared/ui/components/Skeleton/Skeleton.tsx";

export const RepoListSkeleton: React.FC = () => {
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
      {Array.from({ length: 10 }).map((_, index) => (
        <tr key={index}>
          <td className="name"><Skeleton width="100%" height="20px" /></td>
          <td className="stars"><Skeleton width="60px" height="20px" /></td>
          <td className="updated"><Skeleton width="120px" height="20px" /></td>
          <td className="link"><Skeleton width="80px" height="20px" /></td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};
