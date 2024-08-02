import React from "react";
import "./Skeleton.css";

interface SkeletonProps {
  width: string;
  height: string;
  borderRadius?: string;
  style?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  borderRadius = "4px",
  style,
}) => {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius, ...style }}
    />
  );
};

export default Skeleton;
