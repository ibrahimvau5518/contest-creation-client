import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';

const useMyparticipateData = () => {
  const axiosSecure = useAxios();
  const { user, loading } = useContext(AuthContext);

  const {
    data: mydata = [],
    isLoading,
    refetch, 
  } = useQuery({
    queryKey: ['myParticipateData', user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const result = await axiosSecure.get(`/myParticipateData/${user.email}`);
      return result.data || [];
    },
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  return [mydata, isLoading, refetch]; 
};

export default useMyparticipateData;
