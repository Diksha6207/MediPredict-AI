import { useState } from "react";

function SymptomSelector() {
  const [symptom, setSymptom] = useState("");

  return (
    <div style={{ marginTop: "20px" }}>
      <input
        type="text"
        placeholder="Enter symptom"
        value={symptom}
        onChange={(e) => setSymptom(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
        }}
      />
    </div>
  );
}

export default SymptomSelector;