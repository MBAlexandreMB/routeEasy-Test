const router = require('express').Router();
const googleAPI = require('../utils/googleAPI');

router.post('/geocoder', (req, res) => {
  googleAPI.getGeocode(req.body.address)
  .then(result => res.status(200).json(result))
  .catch(e => res.status(500).json(e));
});

module.exports = router;