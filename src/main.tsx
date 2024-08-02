import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import client from "./shared/api/github";
import App from "@/app/App";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
