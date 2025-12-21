// useRole.jsx
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxios from './useAxios';

const useRole = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxios();

  const { data: role = 'participant', isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      if (!user?.email) return 'participant';

      try {
        // ✅ Make sure route matches backend exactly
        const res = await axiosSecure.get(`/users/role/${user.email}`);
        return res.data?.role || 'participant';
      } catch (err) {
        console.error('Failed to fetch role:', err);
        return 'participant'; // fallback
      }
    },
    retry: 1,
  });

  return [role, isLoading];
};

export default useRole;
