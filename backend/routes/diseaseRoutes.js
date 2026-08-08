import express from "express";

import {
  getAllDiseases,
  getDiseaseByName,
  searchDisease,
} from "../controllers/diseaseController.js";

const router = express.Router();

/*
==========================================
GET ALL DISEASES
GET /api/disease
==========================================
*/

router.get("/", getAllDiseases);

/*
==========================================
SEARCH DISEASE
GET /api/disease/search/:keyword
==========================================
*/

router.get("/search/:keyword", searchDisease);

/*
==========================================
GET SINGLE DISEASE
GET /api/disease/:name
==========================================
*/

router.get("/:name", getDiseaseByName);

export default router;