import axios from 'axios';
import { useContext, useEffect, useMemo } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useNavigate } from 'react-router';

const useAxios = () => {
  const { user, getIdToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const axiosSecure = useMemo(() => {
    return axios.create({
      baseURL: 'https://contest-creation.vercel.app',
    });
  }, []);

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async config => {
        if (user && getIdToken) {
          try {
            const token = await getIdToken();
            if (token) config.headers.Authorization = `Bearer ${token}`;
          } catch (error) {
            console.error('Failed to get token:', error);
          }
        }
        return config;
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log('Unauthorized access - logging out');
          await logout();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, getIdToken, logout, navigate, axiosSecure]);

  return axiosSecure;
};

export default useAxios;
