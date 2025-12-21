import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useNavigate } from 'react-router';

const useAxios = () => {
  const { user, getIdToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
  });

  useEffect(() => {
    // ----------------- Request Interceptor -----------------
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

    // ----------------- Response Interceptor -----------------
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
  }, [user, getIdToken, logout, navigate]);

  return axiosSecure;
};

export default useAxios;
