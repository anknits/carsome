const mongoose = require("mongoose");

const timeSlotsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sequenceId: Number,
  startTime: String,
  endTime: String,
  slotName: String,
});

module.exports = mongoose.model("TimeSlot", timeSlotsSchema);
