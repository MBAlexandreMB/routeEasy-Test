const router = require('express').Router();
const geocoder = require('../utils/googleGeocoding');

router.get('/', (req, res, next) => {
  geocoder.getGeocode('Rua Joaquim Távora, 1263 - Vila Mariana')
  .then(result => {
    res.send(result);
  });
});

module.exports = router;