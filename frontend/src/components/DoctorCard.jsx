function DoctorCard({ doctor }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <h3>{doctor?.name || "Doctor Name"}</h3>
      <p>{doctor?.specialization || "Specialization"}</p>
    </div>
  );
}

export default DoctorCard;