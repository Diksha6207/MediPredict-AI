import mongoose from "mongoose";

const diseaseInfoSchema = new mongoose.Schema(
  {
    disease: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    symptoms: [
      {
        type: String
      }
    ],

    medications: [
      {
        type: String
      }
    ],

    precautions: [
      {
        type: String
      }
    ],

    diets: [
      {
        type: String
      }
    ],

    workouts: [
      {
        type: String
      }
    ],

    specialist: {
      type: String,
      default: "General Physician"
    },

    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "DiseaseInfo",
  diseaseInfoSchema
);