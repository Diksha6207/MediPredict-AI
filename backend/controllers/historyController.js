import Prediction from "../models/Prediction.js";

/*
==========================================
GET ALL HISTORY
==========================================
*/

export const getHistory = async (req, res) => {

  try {

    const history = await Prediction.find({

      user: req.user._id

    }).sort({

      createdAt: -1

    });

    return res.status(200).json({

      success: true,

      total: history.length,

      history

    });

  }

  catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

/*
==========================================
GET SINGLE HISTORY
==========================================
*/

export const getHistoryById = async (req, res) => {

  try {

    const prediction = await Prediction.findOne({

      _id: req.params.id,

      user: req.user._id

    });

    if (!prediction) {

      return res.status(404).json({

        success: false,

        message: "Prediction not found."

      });

    }

    return res.status(200).json({

      success: true,

      prediction

    });

  }

  catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

/*
==========================================
DELETE HISTORY
==========================================
*/

export const deleteHistory = async (req, res) => {

  try {

    const prediction = await Prediction.findOne({

      _id: req.params.id,

      user: req.user._id

    });

    if (!prediction) {

      return res.status(404).json({

        success: false,

        message: "Prediction not found."

      });

    }

    await prediction.deleteOne();

    return res.status(200).json({

      success: true,

      message: "History deleted successfully."

    });

  }

  catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};