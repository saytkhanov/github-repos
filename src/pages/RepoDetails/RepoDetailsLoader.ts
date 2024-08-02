import { GET_REPO_DETAILS } from "@/shared/api/github";
import client from "@/shared/api/github";

export const repoDetailsLoader = async ({ params }: any) => {
  const { owner, name } = params;

  try {
    const { data } = await client.query({
      query: GET_REPO_DETAILS,
      variables: { owner, name },
    });

    if (!data || !data.repository) {
      throw new Error("Repository not found");
    }

    return { owner, name, repository: data.repository };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    throw new Response(errorMessage, { status: 404 });
  }
};
