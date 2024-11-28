import axios from '../lib/axios';

class SaleService {
  getAll = () => {
    return axios.get(`/sales`)
    .then((response) => {
      return response.data || null;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  };

  getById = (id) => {
    return axios.get(`/sales/${id}`)
    .then((response) => {
      return response.data || null;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  };

  insert = (request) => {
    return axios.post('/sales', request);
  };

  edit = (request) => {
    return axios.put('/sales', request);
  };

  delete = (request) => {
    return axios.delete(`/sales`, { data: request });
  };
}

const saleService = new SaleService();

export default saleService;