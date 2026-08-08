import mongoose from "mongoose";

const diseaseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    symptoms: [
      {
        type: String,
      },
    ],

    precautions: [
      {
        type: String,
      },
    ],

    recommendedDoctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Disease", diseaseSchema);