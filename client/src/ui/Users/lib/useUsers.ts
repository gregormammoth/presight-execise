import { useEffect, useState } from 'react';
import config from '../../../config';
import { User } from '../../../model';

type UsersResponse = {
  data: User[];
}

type UseUsersProps = {
  search?: string;
  hobby?: string;
  nationality?: string;
}

export const useUsers = ({ search, hobby, nationality }: UseUsersProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const limit = 10;
        const queryParams = {
          page: String(page),
          limit: String(limit),
          search: search || '',
          hobby: hobby || '',
          nationality: nationality || ''
        };
        const queryString = new URLSearchParams(queryParams).toString();
        const response = await fetch(`${config.api.baseUrl}/api/users/list?${queryString}`);
        const data: UsersResponse = await response.json();
        setHasMore(data.data.length > 0);
        setUsers(prev => [...prev, ...data.data]);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [page, search, hobby, nationality]);

  const resetPage = () => {
    setUsers([]);
    setPage(1);
  };

  const incrementPage = () => {
    if (hasMore) {
      setPage((page) => page + 1);
    }
  };

  return {
    users,
    isLoadingUsers: loading,
    hasMoreUsers: hasMore,
    resetPage,
    incrementPage,
  };
};
