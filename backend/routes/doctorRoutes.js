import express from "express";

import {

  recommendDoctors,

  getDoctorById

} from "../controllers/doctorController.js";

const router = express.Router();

/*
=========================================
GET RECOMMENDED DOCTORS
GET /api/doctor/recommend
=========================================
*/

router.get(

  "/recommend",

  recommendDoctors

);

/*
=========================================
GET SINGLE DOCTOR
GET /api/doctor/:id
=========================================
*/

router.get(

  "/:id",

  getDoctorById

);

export default router;