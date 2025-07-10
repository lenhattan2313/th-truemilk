import { QueryClient } from "@tanstack/react-query";

let clientQueryClient: QueryClient | null = null;

export function getQueryClient() {
  // If running on the server, always return a new instance
  if (typeof window === "undefined") {
    return makeQueryClient();
  }

  // On the client, use a singleton
  if (!clientQueryClient) {
    clientQueryClient = makeQueryClient();
  }
  return clientQueryClient;
}

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60, //for hydration
      },
    },
  });
}
