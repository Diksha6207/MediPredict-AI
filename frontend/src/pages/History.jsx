import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

import {
  downloadReport
} from "../services/predictionService";

function History() {

  const navigate = useNavigate();

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    loadHistory();

  }, []);

  const loadHistory = async () => {

    try {

      setLoading(true);

      const response = await API.get(

        "/history"

      );

      if (response.data.success) {

        setHistory(

          response.data.history

        );

      }

      else {

        setError(

          "Unable to load history."

        );

      }

    }

    catch (error) {

      console.error(error);

      setError(

        error.response?.data?.message ||

        "Unable to load history."

      );

    }

    finally {

      setLoading(false);

    }

  };

  const deleteHistory = async (id) => {

    const confirmDelete = window.confirm(

      "Delete this prediction?"

    );

    if (!confirmDelete) return;

    try {

      await API.delete(

        `/history/${id}`

      );

      setHistory(

        history.filter(

          (item) => item._id !== id

        )

      );

    }

    catch (error) {

      alert(

        "Unable to delete history."

      );

    }

  };

  if (loading) {

    return (

      <div

        style={{

          textAlign:"center",

          marginTop:"80px",

          fontSize:"20px"

        }}

      >

        Loading History...

      </div>

    );

  }

  return (

    <div

      style={{

        maxWidth:"1100px",

        margin:"40px auto",

        padding:"30px"

      }}

    >

      <h1

        style={{

          marginBottom:"30px",

          color:"#2563eb"

        }}

      >

        Prediction History

      </h1>

            {

        error && (

          <p

            style={{

              color: "red",

              marginBottom: "20px"

            }}

          >

            {error}

          </p>

        )

      }

      {

        history.length === 0 ? (

          <div

            style={{

              background: "#fff",

              padding: "40px",

              borderRadius: "12px",

              textAlign: "center",

              boxShadow: "0 5px 20px rgba(0,0,0,.08)"

            }}

          >

            <h2>

              No Prediction History Found

            </h2>

            <p>

              Predict your first disease to see history here.

            </p>

          </div>

        ) : (

          <div

            style={{

              display: "grid",

              gap: "20px"

            }}

          >

            {

              history.map((item) => (

                <div

                  key={item._id}

                  style={{

                    background: "#ffffff",

                    padding: "25px",

                    borderRadius: "12px",

                    boxShadow: "0 5px 20px rgba(0,0,0,.08)"

                  }}

                >

                  <h2>

                    {item.disease}

                  </h2>

                  <p>

                    <strong>Confidence :</strong>

                    {" "}

                    {item.confidence}%

                  </p>

                  <p>

                    <strong>Severity :</strong>

                    {" "}

                    {item.severity}

                  </p>

                  <p>

                    <strong>Specialist :</strong>

                    {" "}

                    {item.specialist}

                  </p>

                  <p>

                    <strong>Date :</strong>

                    {" "}

                    {new Date(

                      item.createdAt

                    ).toLocaleString()}

                  </p>

                  <div

                    style={{

                      display: "flex",

                      gap: "10px",

                      flexWrap: "wrap",

                      marginTop: "20px"

                    }}

                  >

                                        <button

                      onClick={() => {

                        localStorage.setItem(

                          "prediction",

                          JSON.stringify(item)

                        );

                        navigate("/result");

                      }}

                      style={buttonStyle}

                    >

                      View

                    </button>

                    <button

                      onClick={() =>

                        downloadReport(item._id)

                      }

                      style={buttonStyle}

                    >

                      Download

                    </button>

                    <button

                      onClick={() =>

                        deleteHistory(item._id)

                      }

                      style={{

                        ...buttonStyle,

                        background: "#dc2626"

                      }}

                    >

                      Delete

                    </button>

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  );

}

const buttonStyle = {

  padding: "10px 18px",

  border: "none",

  borderRadius: "8px",

  background: "#2563eb",

  color: "#ffffff",

  cursor: "pointer",

  fontWeight: "600"

};

export default History;