import User from "../models/User.js";
import mongoose from "mongoose";

export const getWishList = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate(wishList.productId);

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

export const addToWishList = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.wishList.forEach((item) => {
      if (item.productId.toString() === req.body.productId) {
        return res.status(400).json({
          message: "Product already in wishlist",
        });
      }
    });

    await user.updateOne({
      $push: {
        wishList: {
          productId: new mongoose.Types.ObjectId(req.body.productId),
        },
      },
    });

    res.status(200).json({
      message: "Product added to wishlist",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to add product to wishlist",
    });
  }
};

export const removeFromWishList = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { productId } = req.params;
    let isRemoved = false;

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.wishList.forEach(async (item) => {
      if (item.productId.toString() === productId) {
        await user.updateOne({
          $pull: {
            wishList: { productId: new mongoose.Types.ObjectId(productId) },
          },
        });
        isRemoved = true;
      }
    });

    if (isRemoved)
      return res.status(400).json({
        message: "Product not in wishlist",
      });

    return res.status(200).json({
      message: "Product removed from wishlist",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to remove product from wishlist",
    });
  }
};
