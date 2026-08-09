import axios from "axios";
import Prediction from "../models/Prediction.js";
import DiseaseInfo from "../models/DiseaseInfo.js";

/*
==========================================
PREDICT DISEASE
POST /api/prediction/predict
==========================================
*/

export const predictDisease = async (req, res) => {

  try {

    const { symptoms } = req.body;

    if (!symptoms || symptoms.length === 0) {

      return res.status(400).json({

        success: false,

        message: "Please select at least one symptom."

      });

    }

    const ML_API_URL =
  process.env.ML_API_URL ||
  "https://medipredict-ai-2-hcbc.onrender.com";

const mlResponse = await axios.post(
  `${ML_API_URL}/predict`,
  {
    symptoms,
  }
);

    if (!mlResponse.data.success) {

      return res.status(500).json({

        success: false,

        message: "ML Prediction Failed."

      });

    }

    const prediction = mlResponse.data.prediction;

    const diseaseInfo = await DiseaseInfo.findOne({

  disease: prediction.disease

});

    const savedPrediction = await Prediction.create({

  user: req.user._id,

  symptoms,

  disease: prediction.disease,

  confidence: prediction.confidence,

  severity: prediction.severity,

  specialist:
    diseaseInfo?.specialist ||
    prediction.specialist,

  description:
    diseaseInfo?.description ||
    prediction.description,

  medicines:
  diseaseInfo?.medications?.length
    ? diseaseInfo.medications
    : [
        "No specific medicine recommendation available.",
        "Consult a qualified doctor before taking any medicine."
      ],

precautions:
  diseaseInfo?.precautions?.length
    ? diseaseInfo.precautions
    : prediction.precautions,

diet:
  diseaseInfo?.diets?.length
    ? diseaseInfo.diets
    : [
        "Maintain a balanced and nutritious diet.",
        "Drink enough water.",
        "Avoid excessive junk and processed food."
      ],

exercises:
  diseaseInfo?.workouts?.length
    ? diseaseInfo.workouts
    : [
        "Take adequate rest.",
        "Perform light physical activity if comfortable.",
        "Consult a doctor before strenuous exercise."
      ],

  topPredictions:
    prediction.top_predictions || [],

  reportGenerated: true

});

    return res.status(200).json({

  success: true,

  predictionId: savedPrediction._id,

  disease: savedPrediction.disease,

  confidence: savedPrediction.confidence,

  severity: savedPrediction.severity,

  specialist: savedPrediction.specialist,

  description: savedPrediction.description,

  medicines: savedPrediction.medicines,

  precautions: savedPrediction.precautions,

  diet: savedPrediction.diet,

  exercises: savedPrediction.exercises,

  topPredictions: savedPrediction.topPredictions,

});

  }

  catch (error) {

    console.error(

      "Prediction Error:",

      error.message

    );

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

/*
==========================================
DOWNLOAD PREDICTION REPORT
GET /api/prediction/report/:id
==========================================
*/

export const downloadReport = async (req, res) => {

  try {

    const prediction = await Prediction.findOne({

      _id: req.params.id,

      user: req.user._id

    });

        if (!prediction) {

      return res.status(404).json({

        success: false,

        message: "Prediction not found."

      });

    }

    const report = {

      reportGeneratedAt: new Date(),

       prediction: {

  disease: prediction.disease,

  confidence: prediction.confidence,

  severity: prediction.severity,

  specialist: prediction.specialist,

  description: prediction.description,

  precautions: prediction.precautions,

  
  symptoms: prediction.symptoms,

  medicines: prediction.medicines,

  diet: prediction.diet,

  exercises: prediction.exercises,

  topPredictions: prediction.topPredictions || []

}
    };

    res.setHeader(

      "Content-Disposition",

      `attachment; filename=prediction-report-${prediction._id}.json`

    );

    res.setHeader(

      "Content-Type",

      "application/json"

    );

    return res.status(200).send(

      JSON.stringify(report, null, 2)

    );

  }

  catch (error) {

    console.error(

      "Download Report Error:",

      error.message

    );

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

/*
==========================================
SUBMIT FEEDBACK
POST /api/prediction/feedback
==========================================
*/

export const submitFeedback = async (req, res) => {

  try {

    const {

      predictionId,

      feedback

    } = req.body;

    if (!predictionId) {

      return res.status(400).json({

        success: false,

        message: "Prediction ID is required."

      });

    }

    const prediction = await Prediction.findById(

      predictionId

    );

        if (!prediction) {

      return res.status(404).json({

        success: false,

        message: "Prediction not found."

      });

    }

    prediction.feedback = feedback || "";

    await prediction.save();

    return res.status(200).json({

      success: true,

      message: "Feedback submitted successfully."

    });

  }

  catch (error) {

    console.error(

      "Feedback Error:",

      error.message

    );

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};