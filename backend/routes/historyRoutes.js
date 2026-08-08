import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  getHistory,
  getHistoryById,
  deleteHistory,
} from "../controllers/historyController.js";

const router = express.Router();

/*
==========================================
GET ALL PREDICTION HISTORY
GET /api/history
==========================================
*/

router.get(
  "/",
  protect,
  getHistory
);

/*
==========================================
GET SINGLE HISTORY
GET /api/history/:id
==========================================
*/

router.get(
  "/:id",
  protect,
  getHistoryById
);

/*
==========================================
DELETE HISTORY
DELETE /api/history/:id
==========================================
*/

router.delete(
  "/:id",
  protect,
  deleteHistory
);

export default router;