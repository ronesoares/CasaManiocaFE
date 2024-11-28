import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://casamaniocabe-okmn.onrender.com/api/v1',
  //baseURL: 'http://localhost:10000/api/v1',
  timeout: 60000,
  headers: {
    'accept': 'application/json'
  }
});

axiosInstance.interceptors.response.use((response) => response,
  (error) => { 
    console.log('error', error);
    return Promise.reject((error && error.response && error.response.data) || 'Something went wrong'); 
  });

axiosInstance.interceptors.request.use(function (config) {
  let access_token = localStorage.getItem('accessToken');
    
  if(access_token){
      config.headers.Authorization = access_token;
  };

  return config;
});

export default axiosInstance;