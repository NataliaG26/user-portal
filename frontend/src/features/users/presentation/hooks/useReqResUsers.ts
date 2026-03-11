'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ReqResUsersRepository } from '../../infrastructure/repositories/reqres-users.axios.repository';

const repository = new ReqResUsersRepository();

/**
 * Hook for fetching paginated users from ReqRes API.
 */
export function useReqResUsers() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const query = useQuery({
    queryKey: ['reqres-users', page],
    queryFn: () => repository.getUsers(page),
  });

  const filteredUsers = query.data?.data.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    return fullName.includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
  });

  return {
    ...query,
    filteredUsers,
    page,
    setPage,
    search,
    setSearch,
    totalPages: query.data?.total_pages ?? 1,
  };
}