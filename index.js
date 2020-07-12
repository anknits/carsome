const express = require("express");
const availableSlots = require("./routes/availableSlots");
const timeSlots = require("./routes/timeSlots");

const app = express();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://" +
    process.env.Mongo_Atlas_User +
    ":" +
    process.env.Mongo_Atlas_Password +
    "@cluster0.zfv1q.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api/availableSlots", availableSlots);
app.use("/api/timeSlots", timeSlots);

const port = process.env.Port || 5000;
app.listen(port, () => console.log(`listening on port ${port}...`));
