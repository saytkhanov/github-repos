import { FC } from "react";

import Skeleton from "@/shared/ui/components/Skeleton/Skeleton.tsx";

export const RepoDetailsSkeleton: FC = () => {
  return (
    <div className="skeleton-wrapper">
      <h2>
        <Skeleton width="60%" height="32px" />
      </h2>
      <div className="info-row">
        <Skeleton width="30%" height="20px" />
        <Skeleton width="30%" height="20px" />
      </div>
      <div className="owner">
        <Skeleton width="50px" height="50px" borderRadius="50%" />
        <Skeleton width="30%" height="20px" style={{ marginLeft: "10px" }} />
      </div>
      <h3>
        <Skeleton width="40%" height="24px" />
      </h3>
      <ul>
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index}>
            <Skeleton width="80px" height="20px" />
          </li>
        ))}
      </ul>
      <p>
        <Skeleton width="100%" height="80px" />
      </p>
    </div>
  );
};
