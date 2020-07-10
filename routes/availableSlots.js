const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const AvailableSlot = require("../models/availableSlot");

router.put("/", (req, res) => {
  const dateString = req.body.date;
  const seqId = req.body.seqId;
  const availableSlot = new AvailableSlot({
    _id: new mongoose.Types.ObjectId(),
    date: getDate(dateString),
    seqId: seqId,
    startTime: getStartTime(seqId),
    endTime: getEndTime(seqId),
    total: getTotal(dateString),
    available: getTotal(dateString),
    //userIds: null,
  });
  availableSlot
    .save()
    .then((result) => {
      res.status(200).json({
        message: "created slot",
        created: result,
      });
    })
    .catch((err) => {
      console.log("Error occured: " + err);
      res.status(500).json({ error: err });
    });
});

router.get("/", (req, res) => {
  const seq = getElapsedSequences();
  let date = new Date();
  date.setHours(8, 0, 0, 0);
  if (date.getDay() == 0)
    return res.status(422).send("we don't operate on sundays");
  AvailableSlot.find({
    $and: [{ date: date }, { seqId: { $gt: seq } }, { available: { $gt: 0 } }],
  })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:date", (req, res) => {
  let date = getDate(req.params.date);
  if (date == null) return res.status(422).send("date is invalid");
  if (isOldDate(date)) return res.status(422).send("date is old");
  if (!isWithinNext21Days(date))
    return res.status(422).send("date is beyond 21 days");
  if (getTotal(req.params.date) == 0)
    return res.status(422).send("we don't operate on sundays");
  if (date.getDate() == new Date().getDate())
    return res.redirect("/api/availableSlots");
  date.setHours(8, 0, 0, 0);
  AvailableSlot.find({ $and: [{ date: date }, { available: { $gt: 0 } }] })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

function getElapsedSequences() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  let seq = 0;
  if (hours < 9) return 0;
  if (hours >= 18) return 18;
  seq = (hours - 9) * 2;
  if (minutes >= 30) seq++;
  return ++seq;
}

function getDate(dateParam) {
  try {
    let date = new Date(dateParam);
    date.setHours(date.getHours() + 8);
    return date;
  } catch (error) {
    return null;
    //throw new Error("date or format is invalid");
  }
}

function isOldDate(dateParam) {
  let today = new Date();
  const date = new Date(dateParam);
  today.setMilliseconds(date.getMilliseconds());
  today.setSeconds(date.getSeconds());
  today.setMinutes(date.getMinutes());
  return today > date;
}

function isWithinNext21Days(dateParam) {
  const today = new Date();
  let after21Days = new Date();
  after21Days.setDate(today.getDate() + 21);
  return after21Days > dateParam;
}

function getTotal(dateParam) {
  const date = getDate(dateParam);
  if (date == null) throw new Error("date or format is invalid");
  const day = date.getDay();
  if (day == 0) return 0;
  if (day > 0 && day < 6) return 2;
  if (day == 6) return 4;
  throw new Error("date or format is invalid");
}

function getStartTime(seqId) {
  const timeSlot = getTimeSlot(seqId);
  return timeSlot.substr(0, 9);
}

function getEndTime(seqId) {
  const timeSlot = getTimeSlot(seqId);
  return timeSlot.substr(12, 9);
}

function getTimeSlot(seqId) {
  switch (seqId) {
    case 1:
      return "09:00 A.M - 09:30 A.M";
    case 2:
      return "09:30 A.M - 10:00 A.M";
    case 3:
      return "10:00 A.M - 10:30 A.M";
    case 4:
      return "10:30 A.M - 11:00 A.M";
    case 5:
      return "11:00 A.M - 11:30 A.M";
    case 6:
      return "11:30 A.M - 12:00 P.M";
    case 7:
      return "12:00 P.M - 12:30 P.M";
    case 8:
      return "12:30 P.M - 01:00 P.M";
    case 9:
      return "01:00 P.M - 01:30 P.M";
    case 10:
      return "01:30 P.M - 02:00 P.M";
    case 11:
      return "02:00 P.M - 02:30 P.M";
    case 12:
      return "02:30 P.M - 03:00 P.M";
    case 13:
      return "03:00 P.M - 03:30 P.M";
    case 14:
      return "03:30 P.M - 04:00 P.M";
    case 15:
      return "04:00 P.M - 04:30 P.M";
    case 16:
      return "04:30 P.M - 05:00 P.M";
    case 17:
      return "05:00 P.M - 05:30 P.M";
    case 18:
      return "05:30 P.M - 06:00 P.M";
    default:
      throw new Error("invalid sequenceId");
  }
}

module.exports = router;
