import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useVerified = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxios();

  const { data: isVerified = false, isLoading } = useQuery({
    queryKey: ['verified', user?.email],
    enabled: !!user?.email && !loading, 
    queryFn: async () => {
      if (!user?.email) return false;
      try {
        const res = await axiosSecure.get(`/users/verified/${user.email}`);
        return res.data?.permission || false;
      } catch (err) {
        console.error('Failed to fetch verified status:', err);
        return false;
      }
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, 
  });

  return [isVerified, isLoading];
};

export default useVerified;
