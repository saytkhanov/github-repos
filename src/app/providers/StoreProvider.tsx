import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/shared/api/github";

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
