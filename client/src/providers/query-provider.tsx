"use client";

import React from "react";
import {
    QueryClient,
    QueryClientConfig,
    QueryClientProvider,
} from "@tanstack/react-query";

const queryClientOptions = {
    defaultOptions: {
        queries: {
            staleTime: 5 * 1000, // 5 seconds
        },
    },
} satisfies QueryClientConfig;

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = React.useState(
        () => new QueryClient(queryClientOptions)
    );
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};
