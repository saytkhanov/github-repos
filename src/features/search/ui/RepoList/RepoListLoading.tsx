import { FC } from "react";

import Skeleton from "@/shared/ui/components/Skeleton/Skeleton";

interface RepoListLoadingProps {
  rowCount?: number;
}

const DEFAULT_ROW_COUNT = 10;

export const RepoListLoading: FC<RepoListLoadingProps> = ({
  rowCount = DEFAULT_ROW_COUNT,
}) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, index) => (
        <tr key={index}>
          <td className="name">
            <Skeleton width="100%" height="20px" />
          </td>
          <td className="stars">
            <Skeleton width="60px" height="20px" />
          </td>
          <td className="updated">
            <Skeleton width="120px" height="20px" />
          </td>
          <td className="link">
            <Skeleton width="80px" height="20px" />
          </td>
        </tr>
      ))}
    </>
  );
};
