const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const TimeSlot = require("../models/timeSlot");

router.put("/", (req, res) => {
  const timeSlot = new TimeSlot({
    _id: new mongoose.Types.ObjectId(),
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  });
  timeSlot
    .save()
    .then((result) => {
      res.status(200).json({
        message: "created timeSlot",
        created: result,
      });
    })
    .catch((err) => {
      console.log("Error occured: " + err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
