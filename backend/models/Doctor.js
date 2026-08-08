import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    specialization: {
      type: String,
      required: true,
      trim: true,
    },

    qualification: {
      type: String,
      required: true,
    },

    hospital: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      default: "",
    },

    consultationFee: {
      type: Number,
      default: 0,
    },

    phone: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    map: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },

    availableDays: [
      {
        type: String,
      },
    ],

    availableTime: {
      type: String,
      default: "",
    },

    verified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Doctor", doctorSchema);