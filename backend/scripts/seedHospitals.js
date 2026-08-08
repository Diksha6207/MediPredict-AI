import fs from "fs";
import path from "path";
import csv from "csv-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../config/db.js";
import Hospital from "../models/hospital.js";

dotenv.config();

await connectDB();

const hospitals = [];

const filePath = path.join(
  process.cwd(),
  "datasets",
  "hospital_directory.xlsx.csv"
);

fs.createReadStream(filePath)
  .pipe(csv())
  .on("data", (row) => {

    let latitude = 0;
    let longitude = 0;

    if (row.Location_Coordinates) {

      const coordinate = row.Location_Coordinates.split(",");

      if (coordinate.length === 2) {

        latitude = Number(coordinate[0]);

        longitude = Number(coordinate[1]);

      }

    }

    hospitals.push({

      hospitalName: row.Hospital_Name || "",

      state: row.State || "",

      district: row.District || "",

      city:
        row.Town ||
        row.Subtown ||
        row.Village ||
        row.Location ||
        "",

      address: row.Address_Original_First_Line || "",

      phone:
        row.Telephone ||
        row.Mobile_Number ||
        row.Emergency_Num ||
        "",

      mobile: row.Mobile_Number || "",

      website: row.Website || "",

      specialties:
        row.Specialties
          ? row.Specialties
              .split(",")
              .map(item => item.trim())
          : [],

      facilities:
        row.Facilities
          ? row.Facilities
              .split(",")
              .map(item => item.trim())
          : [],

      emergency:
        String(row.Emergency_Services)
          .toLowerCase()
          .includes("yes"),

      latitude,

      longitude

    });

  })

  .on("end", async () => {

    try {

      await Hospital.deleteMany({});

      await Hospital.insertMany(
        hospitals,
        { ordered: false }
      );

      console.log("================================");

      console.log("✅ Hospital Import Completed");

      console.log(
        "Total Hospitals :",
        hospitals.length
      );

      console.log("================================");

      mongoose.connection.close();

    }

    catch (error) {

      console.log(error);

      mongoose.connection.close();

    }

  });