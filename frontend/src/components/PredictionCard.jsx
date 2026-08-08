function PredictionCard({ prediction }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2>Prediction Result</h2>
      <p>{prediction || "No prediction available."}</p>
    </div>
  );
}

export default PredictionCard;