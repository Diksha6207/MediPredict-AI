import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#2563eb" }}>
        Welcome {user?.fullName}
      </h1>

      <p
        style={{
          color: "#555",
          marginBottom: "30px",
        }}
      >
        MediPredict AI Dashboard
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        <Card
          title="Disease Prediction"
          desc="Predict disease using AI"
          onClick={() => navigate("/predict")}
        />

        <Card
          title="Doctors"
          desc="Find specialist doctors"
          onClick={() => navigate("/doctors")}
        />

        <Card
          title="Prediction History"
          desc="View previous reports"
          onClick={() => navigate("/history")}
        />

        <Card
          title="My Profile"
          desc="Update your information"
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
}

function Card({ title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        padding: "25px",
        borderRadius: "15px",
        background: "#fff",
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
      }}
    >
      <h2>{title}</h2>

      <p>{desc}</p>
    </div>
  );
}

export default Dashboard;