import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'https://contest-creation.vercel.app',
});
const usePublicAxios = () => {
  return axiosPublic;
};

export default usePublicAxios;
