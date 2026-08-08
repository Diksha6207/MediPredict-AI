import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  downloadReport
} from "../services/predictionService";

function Result() {

  const navigate = useNavigate();

  const [prediction, setPrediction] = useState(null);

  const [downloading, setDownloading] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/login");

      return;

    }

    const savedPrediction = localStorage.getItem(
      "prediction"
    );

    if (!savedPrediction) {

      navigate("/predict");

      return;

    }

    setPrediction(
      JSON.parse(savedPrediction)
    );

  }, [navigate]);

  const handleDownload = async () => {

    try {

      setDownloading(true);

      await downloadReport(
        prediction._id
      );

      alert(
        "Prediction Report Downloaded Successfully."
      );

    }

    catch (error) {

      console.error(error);

      alert(
        "Unable to download report."
      );

    }

    finally {

      setDownloading(false);

    }

  };

  if (!prediction) {

    return null;

  }

  return (

    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "30px"
      }}
    >

      <div
        style={{
          background: "#ffffff",
          borderRadius: "18px",
          padding: "35px",
          boxShadow: "0 10px 30px rgba(0,0,0,.08)"
        }}
      >

        <h1
          style={{
            color: "#2563eb",
            marginBottom: "10px"
          }}
        >

          🩺 AI Prediction Result

        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px"
          }}
        >

          MediPredict AI has analysed your symptoms.

        </p>

                <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px"
          }}
        >

          <div
            style={{
              background: "#eff6ff",
              padding: "20px",
              borderRadius: "12px"
            }}
          >

            <h3>
              Disease
            </h3>

            <h2
              style={{
                color: "#1e40af",
                marginTop: "10px"
              }}
            >

              {prediction.disease}

            </h2>

          </div>


          <div
            style={{
              background: "#f8fafc",
              padding: "20px",
              borderRadius: "12px"
            }}
          >

            <h3>
              Confidence
            </h3>

            <h2>

              {prediction.confidence}%

            </h2>

          </div>


          <div
            style={{
              background: "#f8fafc",
              padding: "20px",
              borderRadius: "12px"
            }}
          >

            <h3>
              Severity
            </h3>

            <h2>

              {prediction.severity}

            </h2>

          </div>


          <div
            style={{
              background: "#f8fafc",
              padding: "20px",
              borderRadius: "12px"
            }}
          >

            <h3>
              Recommended Specialist
            </h3>

            <h2>

              {prediction.specialist}

            </h2>

          </div>

        </div>

                {
          prediction.topPredictions &&
          prediction.topPredictions.length > 0 && (

            <div
              style={{
                marginTop: "30px",
                background: "#f0fdf4",
                padding: "20px",
                borderRadius: "12px"
              }}
            >

              <h2
                style={{
                  marginBottom: "15px",
                  color: "#166534"
                }}
              >
                Top 3 Possible Diseases
              </h2>

              {
                prediction.topPredictions.map(
                  (item, index) => (

                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom:
                          index !==
                          prediction.topPredictions.length - 1
                            ? "1px solid #d1fae5"
                            : "none"
                      }}
                    >

                      <strong>
                        {index + 1}. {item.disease}
                      </strong>

                      <span>
                        {item.confidence}%
                      </span>

                    </div>

                  )
                )
              }

            </div>

          )
        }

                <div
          style={{
            background: "#f8fafc",
            padding: "25px",
            borderRadius: "12px",
            marginTop: "30px"
          }}
        >

          <h2>
            Description
          </h2>

          <p
            style={{
              marginTop: "15px",
              lineHeight: "1.8"
            }}
          >

            {prediction.description}

          </p>

        </div>

                <div
          style={{
            background: "#f8fafc",
            padding: "25px",
            borderRadius: "12px",
            marginTop: "25px"
          }}
        >

          <h2>
            Precautions
          </h2>

          <ul
            style={{
              marginTop: "15px"
            }}
          >

            {
              prediction.precautions?.length > 0 ? (

                prediction.precautions.map(
                  (item, index) => (

                    <li
                      key={index}
                      style={{
                        marginBottom: "10px"
                      }}
                    >

                      {item}

                    </li>

                  )
                )

              ) : (

                <li>
                  No precaution information available.
                </li>

              )
            }

          </ul>

        </div>


        <div
          style={{
            background: "#f8fafc",
            padding: "25px",
            borderRadius: "12px",
            marginTop: "25px"
          }}
        >

          <h2>
            💊 Medicines
          </h2>

          <ul
            style={{
              marginTop: "15px"
            }}
          >

            {
              prediction.medicines?.length > 0 ? (

                prediction.medicines.map(
                  (item, index) => (

                    <li
                      key={index}
                      style={{
                        marginBottom: "10px"
                      }}
                    >

                      {item}

                    </li>

                  )
                )

              ) : (

                <li>
                  No medicine information available.
                </li>

              )
            }

          </ul>

        </div>

                <div
          style={{
            background: "#f8fafc",
            padding: "25px",
            borderRadius: "12px",
            marginTop: "25px"
          }}
        >

          <h2>
            🥗 Recommended Diet
          </h2>

          <ul
            style={{
              marginTop: "15px"
            }}
          >

            {
              prediction.diet?.length > 0 ? (

                prediction.diet.map(
                  (item, index) => (

                    <li
                      key={index}
                      style={{
                        marginBottom: "10px"
                      }}
                    >

                      {item}

                    </li>

                  )
                )

              ) : (

                <li>
                  No diet information available.
                </li>

              )
            }

          </ul>

        </div>


        <div
          style={{
            background: "#f8fafc",
            padding: "25px",
            borderRadius: "12px",
            marginTop: "25px"
          }}
        >

          <h2>
            🏃 Recommended Exercises
          </h2>

          <ul
            style={{
              marginTop: "15px"
            }}
          >

            {
              prediction.exercises?.length > 0 ? (

                prediction.exercises.map(
                  (item, index) => (

                    <li
                      key={index}
                      style={{
                        marginBottom: "10px"
                      }}
                    >

                      {item}

                    </li>

                  )
                )

              ) : (

                <li>
                  No exercise information available.
                </li>

              )
            }

          </ul>

        </div>

                <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginTop: "35px"
          }}
        >

          <button
            onClick={handleDownload}
            disabled={downloading}
            style={buttonStyle}
          >

            {
              downloading
                ? "Downloading..."
                : "Download Report"
            }

          </button>


          <button
            onClick={() => navigate("/doctors")}
            style={buttonStyle}
          >

            Find Doctors

          </button>


          <button
            onClick={() => navigate("/predict")}
            style={buttonStyle}
          >

            Predict Again

          </button>


          <button
            onClick={() => navigate("/dashboard")}
            style={buttonStyle}
          >

            Dashboard

          </button>

        </div>

      </div>

    </div>

  );

}

const buttonStyle = {

  padding: "13px 22px",

  border: "none",

  borderRadius: "10px",

  cursor: "pointer",

  background: "#2563eb",

  color: "#ffffff",

  fontSize: "15px",

  fontWeight: "600"

};

export default Result;