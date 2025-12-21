import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';

const useMyparticipateData = () => {
  const axiosSecure = useAxios(); // Token automatically add হবে
  const { user, loading } = useContext(AuthContext); // loading ও নেওয়া দরকার

  const {
    data: mydata = [],
    isLoading,
    refetch, // optional, যদি manual refresh দরকার হয়
  } = useQuery({
    queryKey: ['myParticipateData', user?.email],
    enabled: !!user?.email && !loading, // খুব গুরুত্বপূর্ণ: email না থাকলে request চলবে না
    queryFn: async () => {
      const result = await axiosSecure.get(`/myParticipateData/${user.email}`);
      return result.data || []; // fallback empty array
    },
    retry: 1, // error হলে বারবার try করবে না
    staleTime: 5 * 60 * 1000, // 5 মিনিট cache রাখবে (optional, performance এর জন্য)
  });

  return [mydata, isLoading, refetch]; // isLoading ও refetch return করা ভালো
};

export default useMyparticipateData;
