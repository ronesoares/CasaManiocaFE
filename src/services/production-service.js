import axios from '../lib/axios';

class ProductionService {
  getAll = () => {
    return axios.get(`/productions`)
    .then((response) => {
      return response.data || null;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  };

  getById = (id) => {
    return axios.get(`/productions/${id}`)
    .then((response) => {
      return response.data || null;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  };

  insert = (request) => {
    return axios.post('/productions', request);
  };

  edit = (request) => {
    return axios.put('/productions', request);
  };

  delete = (request) => {
    return axios.delete(`/productions`, { data: request });
  };
}

const productionService = new ProductionService();

export default productionService;