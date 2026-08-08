import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/predict.css";

import {
  predictDisease
} from "../services/predictionService";

function Predict() {

  const navigate = useNavigate();

  const symptomList = [

    "Fever",
    "Headache",
    "Cough",
    "Cold",
    "Fatigue",
    "Chest Pain",
    "Shortness of Breath",
    "Vomiting",
    "Diarrhea",
    "Nausea",
    "Abdominal Pain",
    "Back Pain",
    "Joint Pain",
    "Muscle Pain",
    "Skin Rash",
    "Itching",
    "Dizziness",
    "Weight Loss",
    "Weight Gain",
    "Loss of Appetite",
    "High Blood Pressure",
    "Low Blood Pressure",
    "Sore Throat",
    "Sneezing",
    "Runny Nose",
    "Blurred Vision",
    "Eye Pain",
    "Ear Pain",
    "Burning Urination",
    "Frequent Urination"

  ];

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const [loading, setLoading] = useState(false);

  const [consent, setConsent] = useState(false);

  const [city, setCity] = useState("");

  const toggleSymptom = (symptom) => {

    if (selectedSymptoms.includes(symptom)) {

      setSelectedSymptoms(

        selectedSymptoms.filter(

          (item) => item !== symptom

        )

      );

    }

    else {

      setSelectedSymptoms([

        ...selectedSymptoms,

        symptom

      ]);

    }

  };

  const handlePredict = async () => {

    if (selectedSymptoms.length === 0) {

      alert("Please select at least one symptom.");

      return;

    }

    if (!city.trim()) {

      alert("Please enter your city.");

      return;

    }

    if (!consent) {

      alert("Please accept the medical consent.");

      return;

    }

    try {

      setLoading(true);

      const result = await predictDisease({

        symptoms: selectedSymptoms

      });

      localStorage.setItem(

        "prediction",

        JSON.stringify(result)

      );

      localStorage.setItem(

        "city",

        city

      );

      navigate("/result");

    }

    catch (error) {

      console.error(error);

      alert(

        error.response?.data?.message ||

        error.message ||

        "Prediction failed."

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <>

      <section className="predict-hero">

        <div className="predict-container">

          <h1>

            AI Disease Prediction

          </h1>

          <p>

            Select your symptoms, enter your city and let
            MediPredict AI analyse your health condition.

          </p>

        </div>

      </section>

      <section className="symptom-section">

        <div className="predict-container">

          <h2>

            Select Symptoms

          </h2>

          <div className="symptom-grid">

                        {

              symptomList.map((symptom) => (

                <button

                  key={symptom}

                  className={

                    selectedSymptoms.includes(symptom)

                      ? "symptom active"

                      : "symptom"

                  }

                  onClick={() =>

                    toggleSymptom(symptom)

                  }

                  type="button"

                >

                  {symptom}

                </button>

              ))

            }

          </div>

          <div className="city-box">

            <h3>

              Enter Your City

            </h3>

            <input

              type="text"

              className="city-input"

              placeholder="Delhi, Mumbai, Pune..."

              value={city}

              onChange={(e) =>

                setCity(e.target.value)

              }

            />

          </div>

          <div className="consent-box">

            <label>

              <input

                type="checkbox"

                checked={consent}

                onChange={(e) =>

                  setConsent(e.target.checked)

                }

              />

              I understand that MediPredict AI provides
              AI-assisted disease prediction only.

              I will always consult a qualified doctor
              before taking any medicine or treatment.

            </label>

          </div>

          <div className="predict-button-area">

            <button

              className="predict-btn"

              disabled={loading}

              onClick={handlePredict}

            >

              {

                loading

                  ?

                  "Predicting..."

                  :

                  "Predict Disease"

              }

            </button>

          </div>

          {

            loading && (

              <div className="loader-box">

                <div className="loader"></div>

                <p>

                  AI is analysing your symptoms...

                </p>

              </div>

            )

          }

        </div>

      </section>

      <section className="predict-disclaimer">

        <div className="predict-container">

          <h2>

            Medical Disclaimer

          </h2>

          <p>

            MediPredict AI provides AI-assisted disease
            prediction based on selected symptoms.

            This prediction is not a substitute for
            professional medical advice, diagnosis,
            or treatment.

          </p>

        </div>

      </section>

            <section className="back-home">

        <div className="predict-container">

          <Link

            to="/"

            className="back-home-btn"

          >

            ← Back To Home

          </Link>

        </div>

      </section>

    </>

  );

}

export default Predict;