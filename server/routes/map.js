const router = require('express').Router();
const googleAPI = require('../utils/googleAPI');

router.get('/geocoder', (req, res) => {
    googleAPI.getGeocode('Rua Joaquim Távora, 1263 - Vila Mariana')
  .then(result => {
    res.send(result);
  }).catch(e => res.send(e));
});

module.exports = router;