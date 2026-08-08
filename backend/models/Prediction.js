import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(

  {

    user: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,

    },

    symptoms: [

      {

        type: String,

        required: true,

      },

    ],

    disease: {

      type: String,

      required: true,

      trim: true,

    },

    confidence: {

      type: Number,

      required: true,

      min: 0,

      max: 100,

    },

    severity: {

      type: String,

      enum: [

        "Low",

        "Medium",

        "High",

        "Critical",

      ],

      default: "Low",

    },

    specialist: {

      type: String,

      default: "",

    },

    description: {

      type: String,

      default: "",

    },

    medicines: [

      {

        type: String,

      },

    ],

    precautions: [

      {

        type: String,

      },

    ],

    topPredictions: [

  {

    disease: {

      type: String,

      default: ""

    },

    confidence: {

      type: Number,

      default: 0

    }

  }

],

    diet: [

      {

        type: String,

      },

    ],

    exercises: [

      {

        type: String,

      },

    ],

    feedback: {

      type: String,

      default: "",

    },

    reportGenerated: {

      type: Boolean,

      default: false,

    },

  },

  {

    timestamps: true,

  }

);

const Prediction = mongoose.model(
  "Prediction",
  predictionSchema
);

export default Prediction;