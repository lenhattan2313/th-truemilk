"use client";
import { getQueryClient } from "@/lib/getQueryClient";
import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

interface ReactQueryProviderProps {
  children: ReactNode;
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

interface HydrationBoundaryProviderProps {
  children: ReactNode;
  dehydratedState?: unknown;
}

export function HydrationBoundaryProvider({
  children,
  dehydratedState = null,
}: HydrationBoundaryProviderProps) {
  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}
