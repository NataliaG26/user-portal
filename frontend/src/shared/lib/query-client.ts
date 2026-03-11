import { QueryClient } from '@tanstack/react-query';

/**
 * Global TanStack Query client instance.
 * Configured with sensible defaults for the application.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      retry: 1,
    },
  },
});