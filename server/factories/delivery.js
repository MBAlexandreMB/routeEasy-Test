const Delivery = require('../models/Delivery')

const deliveryFactory = () => {

  const getAll = () => {
    return new Promise((resolve, reject) => {
      console.log('oi');
      Delivery.find()
        .then(result => resolve(result))
        .catch(e => reject(e));
    });
  };

  const getOne = (id) => {
    return new Promise((resolve, reject) => {
      Delivery.findById(id)
        .then(result => resolve(result))
        .catch(e => reject(e));
    });
  };
  
  const add = (delivery) => {
    return new Promise((resolve, reject) => {
      Delivery.create(delivery)
        .then(result => resolve(result))
        .catch(e => reject(e));
    });
  };
  
  const edit = (id, delivery) => {
    return new Promise((resolve, reject) => {
      Delivery.findByIdAndUpdate(id, { $set: delivery }, { new: true })
        .then(result => resolve(result))
        .catch(e => reject(e));
    });
  };
  
  const remove = () => {
    return new Promise((resolve, reject) => {
      Delivery.deleteMany()
        .then(result => resolve(result))
        .catch(e => reject(e));
    });
  };

  return { getAll, getOne, add, edit, remove };
};

module.exports = deliveryFactory();