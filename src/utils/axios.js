import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject((error.response && error.response.data) || 'Something went wrong')
  }
);

export default axiosInstance;
