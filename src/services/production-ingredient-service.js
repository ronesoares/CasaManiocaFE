import axios from '../lib/axios';

class ProductionIngredientService {
  getAll = () => {
    return axios.get(`/productionIngredients`)
    .then((response) => {
      return response.data || null;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  };

  getById = (id) => {
    return axios.get(`/productionIngredients/${id}`)
    .then((response) => {
      return response.data || null;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  };

  insert = (request) => {
    return axios.post('/productionIngredients', request);
  };

  edit = (request) => {
    return axios.put('/productionIngredients', request);
  };

  delete = (request) => {
    return axios.delete(`/productionIngredients`, { data: request });
  };
}

const productionIngredientService = new ProductionIngredientService();

export default productionIngredientService;