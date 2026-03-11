'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { AuthAxiosRepository } from '../../infrastructure/repositories/auth.axios.repository';

const loginUseCase = new LoginUseCase(new AuthAxiosRepository());

/**
 * Hook for handling user login.
 * Executes the login use case and redirects on success.
 */
export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUseCase.execute(email, password),
    onSuccess: () => {
      router.push('/users');
    },
  });
}