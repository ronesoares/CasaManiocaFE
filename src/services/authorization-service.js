import axios from '../lib/axios';

class AuthorizationService {
    setAxiosInterceptors = ({ onLogout }) => {
      axios.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response && error.response.status === 401) {
            this.setSession(null);
            this.setUser(null);
  
            if (onLogout) {
              onLogout();
            }
          }
  
          return Promise.reject(error);
        }
      );
    };
  
    loginWithPassword = (login, password) => {
      const data = ({
        'email': login,
        'password': password
      });
  
      const headers = {
        'content-type': 'application/json'
      };
  
      return axios.post('/authorization/login', data, { headers: headers })
        .then((response) => {
                  
          if (response.data) {
            this.setSession(response.data.access_token);
            this.setUser(response.data.user);

            return response.data;
          } else {
            return response.data;
          }
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    };
  
    logout = () => {
      this.setSession(null);
      this.setUser(null);
    }
  
    setSession = (accessToken) => {
      if (accessToken) {
        localStorage.setItem('accessToken', `Bearer ${accessToken}`);

        axios.interceptors.request.use((config) => {
          const access_token = localStorage.getItem('accessToken');
      
          if(access_token){
              config.headers.Authorization = access_token;
          };
        
          return config;
        });
      } else {
        localStorage.removeItem('accessToken');
        axios.interceptors.request.eject();
      }
    }
  
    getAccessToken = () => localStorage.getItem('accessToken');
  
    setUser = (user) => { 
      if (user) {
        user.avatar = '/static/apple-touch-icon.png';
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    };
  
    getUser = () => {
      let appUserData = window.localStorage.getItem('user');
      return JSON.parse(appUserData);
    };
  }
  
  const authorizationService = new AuthorizationService();
  
  export default authorizationService;