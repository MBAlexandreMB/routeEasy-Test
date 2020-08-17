const router = require('express').Router();
const delivery = require('../factories/delivery');

router.get('/', (req, res) => {
  delivery.getAll()
    .then(result => res.status(200).json(result))
    .catch(e => res.status(400).json(e));
});

router.post('/', (req, res) => {
  delivery.add(req.body)
    .then(result => res.status(200).json(result))
    .catch(e => res.status(400).json(e));
});

router.put('/:deliveryId', (req, res) => {
  const { params, body } = req;

  delivery.edit(params.deliveryId, body)
    .then(result => res.status(200).json(result))
    .catch(e => res.status(400).json(e));

});

router.delete('/:itemId', (req, res) => {
  delivery.removeOne(req.params.itemId)
  .then(result => res.status(200).json(result))
  .catch(e => res.status(400).json(e));
});


router.delete('/', (req, res) => {
  delivery.remove()
  .then(result => res.status(200).json(result))
  .catch(e => res.status(400).json(e));
});

module.exports = router;