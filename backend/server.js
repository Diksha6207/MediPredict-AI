import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import diseaseRoutes from "./routes/diseaseRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

dotenv.config();

const app = express();

/*
=====================================
DATABASE
=====================================
*/

connectDB();

/*
=====================================
CORS
=====================================
*/

const allowedOrigins = [
  "http://localhost:5173",
  "https://medi-predict-ai-ebon.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin
      // Example: Postman, server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS blocked:", origin);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

/*
=====================================
MIDDLEWARES
=====================================
*/

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use(helmet());

app.use(morgan("dev"));

/*
=====================================
HOME
=====================================
*/

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 MediPredict AI Backend Running",
    version: "1.0.0",
  });
});

app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    server: "Running",
    database: "Connected",
    timestamp: new Date(),
  });
});

/*
=====================================
API ROUTES
=====================================
*/

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/prediction", predictionRoutes);

app.use("/api/doctor", doctorRoutes);

app.use("/api/disease", diseaseRoutes);

app.use("/api/history", historyRoutes);

/*
=====================================
404
=====================================
*/

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

/*
=====================================
GLOBAL ERROR
=====================================
*/

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/*
=====================================
SERVER
=====================================
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("====================================");
  console.log("🚀 MediPredict AI Server Started");
  console.log(`🌐 http://localhost:${PORT}`);
  console.log("====================================");
});