const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String,
  education: String,
  verified: Boolean
});

module.exports = mongoose.model("User", userSchema);