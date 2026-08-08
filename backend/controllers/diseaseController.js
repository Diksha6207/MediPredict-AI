import Disease from "../models/Disease.js";

/*
==========================================
GET ALL DISEASES
==========================================
*/

export const getAllDiseases = async (req, res) => {
  try {
    const diseases = await Disease.find().sort({
      diseaseName: 1,
    });

    res.status(200).json({
      success: true,
      total: diseases.length,
      diseases,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================
GET SINGLE DISEASE
==========================================
*/

export const getDiseaseByName = async (req, res) => {
  try {
    const disease = await Disease.findOne({
      diseaseName: {
        $regex: req.params.name,
        $options: "i",
      },
    });

    if (!disease) {
      return res.status(404).json({
        success: false,
        message: "Disease not found.",
      });
    }

    res.status(200).json({
      success: true,
      disease,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================
SEARCH DISEASE
==========================================
*/

export const searchDisease = async (req, res) => {
  try {
    const keyword = req.params.keyword;

    const diseases = await Disease.find({
      diseaseName: {
        $regex: keyword,
        $options: "i",
      },
    });

    res.status(200).json({
      success: true,
      total: diseases.length,
      diseases,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};