import { useEffect, useState } from "react";
import axios from "axios";

export default function Exam() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/questions")
      .then((res) => setQuestions(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleAnswer = (opt) => {
    let temp = [...answers];
    temp[current] = opt;
    setAnswers(temp);
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const prevQuestion = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const submitExam = () => {
    console.log("Final Answers:", answers);
    alert("Exam Submitted!");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Exam</h2>

      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        <div>
          <h3>
            Q{current + 1}: {questions[current].question}
          </h3>

          {questions[current].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              style={{
                display: "block",
                margin: "10px auto",
                padding: "10px",
                background:
                  answers[current] === opt ? "green" : "#4b50ed"
              }}
            >
              {opt}
            </button>
          ))}

          <div style={{ marginTop: "20px" }}>
            <button onClick={prevQuestion} disabled={current === 0}>
              Previous
            </button>

            {current === questions.length - 1 ? (
              <button
                onClick={submitExam}
                style={{ marginLeft: "10px", background: "orange" }}
              >
                Submit
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                style={{ marginLeft: "10px" }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}