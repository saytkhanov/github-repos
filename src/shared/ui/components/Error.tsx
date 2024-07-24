import React from "react";

interface ErrorProps {
  message: string;
}

export const Error: React.FC<ErrorProps> = ({ message }) => {
  return <div>Error: {message}</div>;
};
