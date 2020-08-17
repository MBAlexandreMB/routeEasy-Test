const axios = require('axios');

const getGeocode = (address) => {
  address = encodeURI(address);
  return new Promise((resolve, reject) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.G_API_KEY}`
    )
    .then(result => resolve(result.data.results))
    .catch(e => reject(e));
  });
};

module.exports = { getGeocode };