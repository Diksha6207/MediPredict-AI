import API from "./api";

/*
=========================================
PREDICT DISEASE
=========================================
*/

export const predictDisease = async (data) => {

  try {

    const response = await API.post(

      "/prediction/predict",

      data

    );

    if (!response.data.success) {

      throw new Error(

        response.data.message

      );

    }

    const prediction = {

  _id: response.data.predictionId,

  disease: response.data.disease,

  confidence: response.data.confidence,

  severity: response.data.severity,

  specialist: response.data.specialist,

  description: response.data.description,

  medicines: response.data.medicines || [],

  precautions: response.data.precautions || [],

  diet: response.data.diet || [],

  exercises: response.data.exercises || [],

  topPredictions: response.data.topPredictions || []

};

    localStorage.setItem(

      "prediction",

      JSON.stringify(prediction)

    );

    return prediction;

  }

  catch (error) {

    console.error(

      "Prediction Error:",

      error.response?.data ||

      error.message

    );

    throw error;

  }

};

/*
=========================================
DOWNLOAD REPORT
=========================================
*/

export const downloadReport = async (

  predictionId

) => {

  try {

    const response = await API.get(

      `/prediction/report/${predictionId}`,

      {

        responseType: "blob"

      }

    );

    const blob = new Blob(

      [response.data],

      {

        type: "application/json"

      }

    );

    const url = window.URL.createObjectURL(

      blob

    );

    const link = document.createElement(

      "a"

    );

    link.href = url;

    link.download = `prediction-report-${predictionId}.json`;

    document.body.appendChild(

      link

    );

    link.click();

    link.remove();

    window.URL.revokeObjectURL(

      url

    );

    return true;

  }

  catch (error) {

    console.error(

      "Download Report Error:",

      error.response?.data ||

      error.message

    );

    throw error;

  }

};

/*
=========================================
SUBMIT FEEDBACK
=========================================
*/

export const submitFeedback = async (

  predictionId,

  feedback

) => {

  try {

    const response = await API.post(

      "/prediction/feedback",

      {

        predictionId,

        feedback

      }

    );

    return response.data;

  }

  catch (error) {

    console.error(

      "Feedback Error:",

      error.response?.data ||

      error.message

    );

    throw error;

  }

};

/*
=========================================
GET SINGLE REPORT
=========================================
*/

export const getPredictionReport = async (

  predictionId

) => {

  try {

    const response = await API.get(

      `/prediction/report/${predictionId}`

    );

    return response.data;

  }

  catch (error) {

    console.error(

      "Report Error:",

      error.response?.data ||

      error.message

    );

    throw error;

  }

};