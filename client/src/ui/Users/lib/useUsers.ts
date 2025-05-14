import { useEffect, useState } from 'react';
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
        const response = await fetch(`http://localhost:3001/api/users/list?page=${page}&limit=${limit}&search=${search || ''}&hobby=${hobby || ''}&nationality=${nationality || ''}`);
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
