const mongoose = require("mongoose");
//const Car = require("./car.js");
//const CarSchema = mongoose.model("Car").schema;

const usersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: Number,
  name: String,
  carId: [Number],
});

module.exports = mongoose.model("User", usersSchema);
