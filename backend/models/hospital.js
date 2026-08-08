import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    hospitalName: {
      type: String,
      required: true,
      trim: true
    },

    state: {
      type: String,
      default: ""
    },

    district: {
      type: String,
      default: ""
    },

    city: {
      type: String,
      default: ""
    },

    address: {
      type: String,
      default: ""
    },

    phone: {
      type: String,
      default: ""
    },

    mobile: {
      type: String,
      default: ""
    },

    website: {
      type: String,
      default: ""
    },

    specialties: [
      {
        type: String
      }
    ],

    facilities: [
      {
        type: String
      }
    ],

    emergency: {
      type: Boolean,
      default: false
    },

    latitude: {
      type: Number,
      default: 0
    },

    longitude: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Hospital",
  hospitalSchema
);