import axios from '../lib/axios';

class IngredientService {
  getAll = () => {
    return axios.get(`/ingredients`)
    .then((response) => {
      return response.data || null;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  };

  getById = (id) => {
    return axios.get(`/ingredients/${id}`)
    .then((response) => {
      return response.data || null;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  };

  insert = (request) => {
    return axios.post('/ingredients', request);
  };

  edit = (request) => {
    return axios.put('/ingredients', request);
  };

  delete = (request) => {
    return axios.delete(`/ingredients`, { data: request });
  };
}

const ingredientService = new IngredientService();

export default ingredientService;