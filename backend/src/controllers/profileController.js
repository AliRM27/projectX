import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

export const getUser = async (req, res) => {
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

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.updateOne({ $set: req.body });

    res.status(200).json({
      message: "Profile updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update user data",
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.deleteOne();
    await Cart.deleteOne({ user: req.userId });
    await Order.deleteMany({ user: req.userId });

    res.status(200).json({
      message: "Profile deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete user data",
    });
  }
};
