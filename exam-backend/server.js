const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// 🔥 Model


// ---------------- OTP ----------------
let otpStore = {};

app.post("/send-otp", (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = otp;

  console.log("OTP for", email, ":", otp);

  res.send({ message: "OTP sent" });
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (String(otpStore[email]) === String(otp)) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

// ---------------- QUESTIONS ----------------
const Question = require("./models/Question");

app.get("/questions", async (req, res) => {
  try {
    const data = await Question.find();
    console.log("Questions:", data.length);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

// ---------------- SUBMIT ----------------
app.post("/submit", (req, res) => {
  try {
    const { answers, questions } = req.body;

    if (!answers || !questions) {
      return res.status(400).send("Missing data");
    }

    let correct = 0;
    let unanswered = 0;

    questions.forEach((q, i) => {
      if (!answers[i]) {
        unanswered++;
      } else if (q.answer === answers[i]) {
        correct++;
      }
    });

    const total = questions.length;
    const wrong = total - correct - unanswered;
    const percentage = (correct / total) * 100;

    res.send({
      correct,
      wrong,
      unanswered,
      percentage,
      status: percentage >= 50 ? "Pass" : "Fail"
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// ---------------- SERVER ----------------
app.listen(5000, () => {
  console.log("Server running on port 5000");
});