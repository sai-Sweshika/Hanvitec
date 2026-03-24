const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  userId: String,
  answers: Array,
  score: Number,
  percentage: Number,
  status: String
});

module.exports = mongoose.model("Result", resultSchema);