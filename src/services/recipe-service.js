import axios from '../lib/axios';

class RecipeService {
  getAll = () => {
    return axios.get(`/recipes`)
    .then((response) => {
      return response.data || null;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  };

  getById = (id) => {
    return axios.get(`/recipes/${id}`)
    .then((response) => {
      return response.data || null;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  };

  getByProduct = (productId) => {
    return axios.get(`/recipes/by-inventory/${productId}`)
    .then((response) => {
      return response.data || null;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  }

  insert = (request) => {
    return axios.post('/recipes', request);
  };

  edit = (request) => {
    return axios.put('/recipes', request);
  };

  delete = (request) => {
    return axios.delete(`/recipes`, { data: request });
  };
}

const recipeService = new RecipeService();

export default recipeService;