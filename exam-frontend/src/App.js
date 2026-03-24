import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import OTP from "./pages/Otp";
import Exam from "./pages/Exam";
import Result from "./pages/Result";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;