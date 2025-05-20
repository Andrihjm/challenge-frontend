import type React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../libs/query-client";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
