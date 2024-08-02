import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@/pages/Home/Home";
import { RepoDetails } from "@/pages/RepoDetails/RepoDetails";
import { repoDetailsLoader } from "@/pages/RepoDetails/RepoDetailsLoader.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/repo/:owner/:name",
    element: <RepoDetails />,
    loader: repoDetailsLoader,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
