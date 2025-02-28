import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const { passwordHash, ...UserData } = user._doc;

    res.status(200).json(UserData);
  } catch (err) {
    res.status(500).json({
      message: "Failed to retrieve user data",
    });
  }
};

export const getWishList = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user.wishList);
  } catch (err) {
    res.status(500).json({
      message: "Failed to retrieve user data",
    });
  }
};
