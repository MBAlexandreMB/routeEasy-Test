const axios = require('axios');
const jsonData = require('./mockData');

const getGeocode = (adress) => {
  adress = encodeURI(adress);
  return new Promise((resolve, reject) => {
    resolve(jsonData);
  });
  // axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${adress}&key=${process.env.G_API_KEY}`
  // )
  // .then(result => resolve(result.data.results))
  // .catch(e => reject(e));
};

module.exports = { getGeocode };