const mongoose = require('mongoose');

module.exports = new mongoose.model(
  'deliveries', 
  new mongoose.Schema(
    {
      clientName: String,
      weightInKg: Number,
      address: {
        street: String,
        number: String,
        district: String,
        complement: String,
        city: String,
        state: String,
        country: String,
        placeId: String,
        location: {
          latitude: Number,
          longitude: Number 
        },
      }
    },
    {
      timestamps: true,
    }
  )
);