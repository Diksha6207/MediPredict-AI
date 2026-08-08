import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Hospital from "../models/hospital.js";

dotenv.config();

await connectDB();

console.log("Total Hospitals:");
console.log(await Hospital.countDocuments());

console.log("\nFirst Hospital:");
console.log(await Hospital.findOne());

process.exit();