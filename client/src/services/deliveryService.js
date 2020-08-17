import axios from 'axios';

const deliveryService = () => {
  const getGeocode = (address) => {
    return axios.post(`${process.env.BASE_URL}/map/geocoder`, address);
  }

  const getAll = () => {
    console.log('chamou getall');
    return axios.get(`${process.env.BASE_URL}/deliveries/`);
  };

  const add = (delivery) => {
    console.log('chamou add', delivery);

    return axios.post(`${process.env.BASE_URL}/deliveries/`, delivery);
  };

  const remove = () => {
    return axios.delete(`${process.env.BASE_URL}/deliveries/`);
  };

  const removeOne = (itemId) => {
    return axios.delete(`${process.env.BASE_URL}/deliveries/${itemId}`);
  };
  
  return {
    getAll, add, remove, 
    removeOne, getGeocode
  };
};

export default deliveryService();