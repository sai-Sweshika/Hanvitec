const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  course: String,
  language: String,
  question: String,
  options: [String],
  answer: String
});

module.exports = mongoose.model("Question", questionSchema);