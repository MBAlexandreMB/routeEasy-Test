const Delivery = require('../models/Delivery')

const deliveryFactory = () => {

  const getAll = () => {
    return new Promise((resolve, reject) => {
      Delivery.find()
        .then(result => {
          resolve(result);
        })
        .catch(e => reject({
          message: 'Erro ao tentar encontrar entregas',
          code: 'DGE01',
          error: e,
        }));
    });
  };

  const getOne = (id) => {
    return new Promise((resolve, reject) => {
      Delivery.findById(id)
        .then(result => {
          if (!result.length > 0) {
            reject({
              message: "Nenhuma entrega encontrada para o código informado",
              code: 'DGE02',
            });
            return;
          }

          resolve(result);
        })
        .catch(e => reject({
          message: 'Erro ao tentar encontrar a entrega',
          code: 'DGE03',
          error: e,
        }));
    });
  };
  
  const add = (delivery) => {
    return new Promise((resolve, reject) => {
      if (!delivery.clientName) {
        reject({
          message: 'Nome do cliente é obrigatório',
          code: 'DPE01',
        });
        return;
      }

      if (!delivery.weightInKg) {
        reject({
          message: 'Peso em quilos é obrigatório',
          code: 'DPE02',
        });
        return;
      }

      if (!delivery.adress ||
          !delivery.adress.placeId ||
          !delivery.adress.location ||
          !(typeof delivery.adress.location.latitude === 'number' &&
            typeof delivery.adress.location.latitude === 'number')
        ) {
        reject({
          message: 'Endereço é obrigatório',
          code: 'DPE03',
        });
        return;
      }

      Delivery.create(delivery)
        .then(result => resolve(result))
        .catch(e => reject({
          message: 'Não foi possível adicionar uma nova entrega',
          code: 'DPE04',
          error: e,
        }));
    });
  };
  
  const edit = (id, delivery) => {
    return new Promise((resolve, reject) => {
      if (delivery.hasOwnProperty('clientName') && !delivery.clientName) {
        reject({
          message: 'Nome do cliente é obrigatório',
          code: 'DUE01',
        });
        return;
      }

      if (delivery.hasOwnProperty('weightInKg') && !delivery.weightInKg) {
        reject({
          message: 'Peso em quilos é obrigatório',
          code: 'DUE02',
        });
        return;
      }

      if (delivery.hasOwnProperty('adress') &&
        (
          !delivery.adress.placeId ||
          !delivery.adress.location ||
          !(typeof delivery.adress.location.latitude === 'number' &&
            typeof delivery.adress.location.latitude === 'number')
        )
      ) {
        reject({
          message: 'Endereço é obrigatório',
          code: 'DUE03',
        });
        return;
      }

      Delivery.findByIdAndUpdate(id, { $set: delivery }, { new: true })
        .then(result => {
          if (!result) {
            reject({
              message: "Nenhuma entrega encontrada para o código informado",
              code: 'DUE04',
            });
            return;
          } else {
            resolve(result);
          }
        })
        .catch(e => reject({
          message: 'Não foi possível editar a entrega',
          code: 'DUE05',
          error: e,
        }));
    });
  };
  
  const remove = () => {
    return new Promise((resolve, reject) => {
      Delivery.deleteMany()
        .then(result => resolve(result))
        .catch(e => reject({
          message: 'Não foi possível excluir as entregas',
          code: 'DDE01',
          error: e,
        }));
    });
  };

  return { getAll, getOne, add, edit, remove };
};

module.exports = deliveryFactory();