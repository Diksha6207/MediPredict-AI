import User from "../models/User.js";

// ===============================
// Get Current User Profile
// ===============================
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// Update User Profile
// ===============================
export const updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      age,
      gender,
      bloodGroup,
      height,
      weight,
      profileImage,
    } = req.body;


    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    user.fullName = fullName || user.fullName;
    user.phone = phone || user.phone;
    user.age = age || user.age;
    user.gender = gender || user.gender;
    user.bloodGroup = bloodGroup || user.bloodGroup;
    user.height = height || user.height;
    user.weight = weight || user.weight;
    user.profileImage = profileImage || user.profileImage;


    await user.save();


    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        age: user.age,
        gender: user.gender,
        bloodGroup: user.bloodGroup,
      },
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};