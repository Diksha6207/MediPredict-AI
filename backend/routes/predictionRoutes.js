import express from "express";

import protect from "../middleware/authMiddleware.js";

import {

  predictDisease,

  downloadReport,

  submitFeedback

} from "../controllers/predictionController.js";

const router = express.Router();

/*
=========================================
PREDICT DISEASE
=========================================
*/

router.post(

  "/predict",

  protect,

  predictDisease

);

/*
=========================================
DOWNLOAD REPORT
=========================================
*/

router.get(

  "/report/:id",

  protect,

  downloadReport

);

/*
=========================================
SUBMIT FEEDBACK
=========================================
*/

router.post(

  "/feedback",

  protect,

  submitFeedback

);

export default router;