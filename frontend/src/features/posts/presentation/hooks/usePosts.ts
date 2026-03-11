'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CreatePostUseCase } from '../../application/use-cases/create-post.use-case';
import { ListPostsUseCase } from '../../application/use-cases/list-posts.use-case';
import { UpdatePostUseCase } from '../../application/use-cases/update-post.use-case';
import { DeletePostUseCase } from '../../application/use-cases/delete-post.use-case';
import { PostAxiosRepository } from '../../infrastructure/repositories/post.axios.repository';
import { PostEntity } from '../../domain/entities/post.entity';

const repository = new PostAxiosRepository();
const listPostsUseCase = new ListPostsUseCase(repository);
const createPostUseCase = new CreatePostUseCase(repository);
const updatePostUseCase = new UpdatePostUseCase(repository);
const deletePostUseCase = new DeletePostUseCase(repository);

/**
 * Hook for fetching all posts.
 */
export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => listPostsUseCase.execute(),
  });
}

/**
 * Hook for creating a new post.
 */
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<PostEntity, 'id' | 'createdAt' | 'updatedAt'>) =>
      createPostUseCase.execute(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

/**
 * Hook for updating a post.
 */
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Pick<PostEntity, 'title' | 'content'>> }) =>
      updatePostUseCase.execute(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

/**
 * Hook for deleting a post.
 */
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePostUseCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}