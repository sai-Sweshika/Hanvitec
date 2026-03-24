import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    console.log("Sending OTP...")
    await axios.post("http://localhost:5000/send-otp", { email });
    localStorage.setItem("email", email);
    navigate("/otp");
  };

  return (
    <div>
      <h2>Enter Email</h2>
      <input onChange={(e) => setEmail(e.target.value)} />
      <button onClick={sendOtp}>Send OTP</button>
    </div>
  );
}