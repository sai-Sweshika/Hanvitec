import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const verify = async () => {
    const email = localStorage.getItem("email");

    try {
      const res = await axios.post("http://localhost:5000/verify-otp", {
        email,
        otp
      });

      if (res.data.success) {
        alert("OTP Verified ✅");
        navigate("/exam");
      } else {
        alert("Wrong OTP ❌");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Enter OTP</h2>

      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />

      <button onClick={verify}>Verify</button>
    </div>
  );
}