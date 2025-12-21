import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const usePagination = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();

  const { data: count = 0 } = useQuery({
    queryKey: ['mydata', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/count/host/contest/${user?.email}`
      );
      return result.data.count;
    },
  });

  return [count];
};

export default usePagination;
