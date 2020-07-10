const mongoose = require("mongoose");

const carsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  carId: Number,
  brand: String,
  model: String,
  year: String,
  registrationNumber: String,
});

module.exports = mongoose.model("Car", carsSchema);
