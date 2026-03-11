'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { GetSavedUsersUseCase } from '../../application/use-cases/get-saved-users.use-case';
import { ImportUserUseCase } from '../../application/use-cases/import-user.use-case';
import { UserAxiosRepository } from '../../infrastructure/repositories/user.axios.repository';

const repository = new UserAxiosRepository();
const getSavedUsersUseCase = new GetSavedUsersUseCase(repository);
const importUserUseCase = new ImportUserUseCase(repository);

/**
 * Hook for fetching and managing locally saved users.
 */
export function useSavedUsers() {
  return useQuery({
    queryKey: ['users', 'saved'],
    queryFn: () => getSavedUsersUseCase.execute(),
  });
}

/**
 * Hook for importing a user from ReqRes and saving locally.
 */
export function useImportUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => importUserUseCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'saved'] });
    },
  });
}