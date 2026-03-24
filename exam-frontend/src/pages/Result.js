export default function Result() {
  const result = JSON.parse(localStorage.getItem("result"));

  return (
    <div className="result-box">
      <h2>Result</h2>
      <p>Correct: {result.correct}</p>
      <p>Wrong: {result.wrong}</p>
      <p>Unanswered: {result.unanswered}</p>
      <p>Percentage: {result.percentage}%</p>
      <h3>{result.status}</h3>
    </div>
  );
}