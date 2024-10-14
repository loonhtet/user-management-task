"use client"; // Only for this file

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function ClientProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
