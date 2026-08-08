import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctors } from "../services/doctorService";

function Doctors() {

  const navigate = useNavigate();

  const [city, setCity] = useState("");

  const [reportFile, setReportFile] = useState(null);

  const [prediction, setPrediction] = useState(null);

  const [specialist, setSpecialist] = useState("");

  const [disease, setDisease] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [doctors, setDoctors] = useState([]);

  const uploadReport = async (e) => {

    try {

      const file = e.target.files[0];

      if (!file) return;

      setReportFile(file);

      const text = await file.text();

      const data = JSON.parse(text);

      const predictionData = data.prediction || data;

      setPrediction(predictionData);

      setDisease(
        predictionData.disease || ""
      );

      setSpecialist(
        predictionData.specialist ||
        "General Physician"
      );

      setError("");

    }

    catch (err) {

      console.log(err);

      setPrediction(null);

      setDisease("");

      setSpecialist("");

      setDoctors([]);

      setError("Invalid prediction report.");

    }

  };

  const findDoctors = async () => {

    if (!prediction) {

      alert("Upload prediction report first.");

      return;

    }

    if (!city.trim()) {

      alert("Enter your city.");

      return;

    }

    try {

      setLoading(true);

      setDoctors([]);

      setError("");

      const response = await getDoctors(

        specialist,

        city

      );

      if (

        response.success &&

        response.doctors.length > 0

      ) {

        setDoctors(

          response.doctors

        );

      }

      else {

        setError(

          "No nearby hospitals found."

        );

      }

    }

    catch (err) {

      console.log(err);

      setError(

        "Unable to fetch nearby doctors."

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "30px"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "25px"
        }}
      >
        Nearby Doctor Recommendation
      </h1>

            <div
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 8px 25px rgba(0,0,0,.08)",
          display: "flex",
          flexDirection: "column",
          gap: "18px"
        }}
      >

        <label
          style={{
            fontWeight: "bold"
          }}
        >
          Upload Prediction Report
        </label>

        <input
          type="file"
          accept=".json"
          onChange={uploadReport}
        />

        <label
          style={{
            fontWeight: "bold"
          }}
        >
          Predicted Disease
        </label>

        <input
          value={disease}
          readOnly
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd"
          }}
        />

        <label
          style={{
            fontWeight: "bold"
          }}
        >
          Recommended Specialist
        </label>

        <input
          value={specialist}
          readOnly
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd"
          }}
        />

        <label
          style={{
            fontWeight: "bold"
          }}
        >
          Enter Your City
        </label>

        <input
          placeholder="Delhi, Mumbai, Pune..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd"
          }}
        />

        <button
          onClick={findDoctors}
          disabled={loading}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "15px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          {
            loading
              ? "Searching..."
              : "Find Nearby Doctors"
          }
        </button>

      </div>

      {

        loading &&

        <h2
          style={{
            textAlign: "center",
            marginTop: "30px"
          }}
        >
          Searching nearby hospitals...
        </h2>

      }

      {

        error &&

        <div
          style={{
            marginTop: "25px",
            color: "#dc2626",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          {error}
        </div>

      }

      {

        doctors.length > 0 &&

        <div
          style={{
            marginTop: "40px"
          }}
        >

          <h2>

            Nearby Hospitals & Doctors

          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
              gap: "20px",
              marginTop: "20px"
            }}
          >

                      {

              doctors.map((doctor, index) => (

                <div

                  key={index}

                  style={{

                    background: "#ffffff",

                    borderRadius: "15px",

                    padding: "20px",

                    boxShadow: "0 8px 20px rgba(0,0,0,.08)"

                  }}

                >

                  <h3>

                    {doctor.name}

                  </h3>

                  <p>

                    <strong>Specialist :</strong> {doctor.specialization}

                  </p>

                  <p>

                    <strong>Hospital :</strong> {doctor.hospital}

                  </p>

                  <p>

                    <strong>Address :</strong> {doctor.address}

                  </p>

                  <p>

                    <strong>Phone :</strong> {doctor.phone || "Not Available"}

                  </p>

                  <p>

                    <strong>Rating :</strong> ⭐ {doctor.rating || "N/A"}

                  </p>

                  <div

                    style={{

                      display: "flex",

                      gap: "10px",

                      flexWrap: "wrap",

                      marginTop: "18px"

                    }}

                  >

                    <a

                      href={doctor.map}

                      target="_blank"

                      rel="noreferrer"

                      style={{

                        textDecoration: "none",

                        background: "#2563eb",

                        color: "#fff",

                        padding: "10px 16px",

                        borderRadius: "8px"

                      }}

                    >

                      Google Maps

                    </a>

                    {

                      doctor.website && (

                        <a

                          href={doctor.website}

                          target="_blank"

                          rel="noreferrer"

                          style={{

                            textDecoration: "none",

                            background: "#16a34a",

                            color: "#fff",

                            padding: "10px 16px",

                            borderRadius: "8px"

                          }}

                        >

                          Website

                        </a>

                      )

                    }

                    {

                      doctor.phone &&

                      doctor.phone !== "Not Available" && (

                        <a

                          href={`tel:${doctor.phone}`}

                          style={{

                            textDecoration: "none",

                            background: "#ea580c",

                            color: "#fff",

                            padding: "10px 16px",

                            borderRadius: "8px"

                          }}

                        >

                          Call Now

                        </a>

                      )

                    }

                  </div>

                </div>

              ))

            }

          </div>

        </div>

      }

      <div

        style={{

          marginTop: "40px",

          textAlign: "center"

        }}

      >

        <button

          onClick={() => navigate("/predict")}

          style={{

            background: "#2563eb",

            color: "#fff",

            border: "none",

            padding: "14px 24px",

            borderRadius: "10px",

            cursor: "pointer",

            fontSize: "16px",

            fontWeight: "bold"

          }}

        >

          ← Back to Prediction

        </button>

      </div>

    </div>

  );

}

export default Doctors;