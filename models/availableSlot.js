const mongoose = require("mongoose");
//const User = require("./user.js");
//const userSchema = mongoose.model("User").schema;

const availableSlotsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: Date,
  seqId: Number,
  startTime: String,
  endTime: String,
  total: Number,
  available: Number,
  userIds: [Number],
});

module.exports = mongoose.model("AvailableSlot", availableSlotsSchema);
