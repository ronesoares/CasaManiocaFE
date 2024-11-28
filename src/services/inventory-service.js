import axios from '../lib/axios';

class InventoryService {
  getAll = () => {
    return axios.get(`/inventories`)
    .then((response) => {
      return response.data || null;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  };

  getById = (id) => {
    return axios.get(`/inventories/${id}`)
    .then((response) => {
      return response.data || null;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  };

  insert = (request) => {
    return axios.post('/inventories', request);
  };

  edit = (request) => {
    return axios.put('/inventories', request);
  };

  delete = (request) => {
    return axios.delete(`/inventories`, { data: request });
  };
}

const inventoryService = new InventoryService();

export default inventoryService;