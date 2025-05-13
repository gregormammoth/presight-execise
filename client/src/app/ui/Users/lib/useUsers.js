import { useEffect, useState } from 'react';

export const useUsers = ({ search, hobby, nationality }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const limit = 10;
        const response = await fetch(`http://localhost:3001/api/users?page=${page}&limit=${limit}&search=${search || ''}&hobby=${hobby || ''}&nationality=${nationality || ''}`);
        const data = await response.json();
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
