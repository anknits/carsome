const mongoose = require("mongoose");

const availableTimeSlotsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: Date,
  timeSlotSequenceId: Number,
  total: Number,
  available: Number,
});

module.exports = mongoose.model("AvailableTimeSlot", availableTimeSlotsSchema);
