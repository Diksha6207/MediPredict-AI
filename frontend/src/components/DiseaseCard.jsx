function DiseaseCard({ disease }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <h3>{disease?.name || "Disease Name"}</h3>
      <p>{disease?.description || "Disease description."}</p>
    </div>
  );
}

export default DiseaseCard;