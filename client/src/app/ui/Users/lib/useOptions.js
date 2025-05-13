import { useEffect, useState } from 'react';

export const useOptions = () => {
  const [hobbies, setTopHobbies] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/api/users/options`);
        const data = await response.json();
        setTopHobbies(data.topHobbies);
        setNationalities(data.nationalities);
      } catch (error) {
        console.error('Error fetching aggregates:', error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return {
    hobbies,
    nationalities,
    isLoadingOptions: loading,
  };
};
