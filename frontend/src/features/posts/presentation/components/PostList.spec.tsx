import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import PostList from './PostList';

vi.mock('../hooks/usePosts', () => ({
  usePosts: () => ({
    data: [
      {
        id: 1,
        title: 'Test Post',
        content: 'Test content here',
        authorUserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    isLoading: false,
    isError: false,
  }),
  useDeletePost: () => ({
    mutate: vi.fn(),
  }),
  useUpdatePost: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

const queryClient = new QueryClient();

const renderWithProviders = (component: React.ReactNode) =>
  render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );

describe('PostList', () => {
  it('should render list of posts', () => {
    renderWithProviders(<PostList />);

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test content here')).toBeInTheDocument();
  });

  it('should render edit and delete buttons for each post', () => {
    renderWithProviders(<PostList />);

    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });
});