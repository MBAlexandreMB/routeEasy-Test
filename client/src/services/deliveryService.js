import axios from 'axios';

const deliveryService = () => {
  const getGeocode = (address) => {
    return axios.post(`${process.env.BASE_URL}/map/geocoder`, address);
  }

  const getAll = () => {
    return axios.get(`${process.env.BASE_URL}/deliveries/`);
  };

  const getOne = (deliveryId) => {
    return axios.get(`${process.env.BASE_URL}/deliveries/${deliveryId}`);
  };

  const add = (delivery) => {
    return axios.post(`${process.env.BASE_URL}/deliveries/`, delivery);
  };

  const edit = (deliveryId, delivery) => {
    return axios.put(`${process.env.BASE_URL}/deliveries/${deliveryId}`, delivery);
  };

  const remove = () => {
    return axios.delete(`${process.env.BASE_URL}/deliveries/`);
  };

  const removeOne = (itemId) => {
    return axios.delete(`${process.env.BASE_URL}/deliveries/${itemId}`);
  };
  
  return {
    getAll, getOne, add,
    edit, remove, removeOne,
    getGeocode
  };
};

export default deliveryService();