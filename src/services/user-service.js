import axios from '../lib/axios';

class UserService {
  getAll = () => {
    return axios.get(`/users`)
    .then((response) => {
      return response.data || null;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  };

  getById = (id) => {
    return axios.get(`/users/${id}`)
    .then((response) => {
      return response.data || null;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  };

  insert = (request) => {
    return axios.post('/users', request);
  };

  edit = (request) => {
    return axios.put('/users', request);
  };

  delete = (request) => {
    return axios.delete(`/users`, { data: request });
  };

  recoveryPassword = (email) => {
    return axios.put(`/users/recovery-password?email=${email}`);
  };
}

const userService = new UserService();

export default userService;