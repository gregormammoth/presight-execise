import { useEffect, useState } from 'react';

type OptionsResponse = {
  topHobbies: string[];
  nationalities: string[];
}

export const useOptions = () => {
  const [hobbies, setTopHobbies] = useState<string[]>([]);
  const [nationalities, setNationalities] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/api/users/options`);
        const data: OptionsResponse = await response.json();
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
