import WishList from "../models/WishList.js";
import mongoose from "mongoose";

export const getWishList = async (req, res) => {
  try {
    const userId = req.userId;
    const wishList = await WishList.findOne({ user: userId }).populate(
      "items.product"
    );
    if (!wishList) {
      return res.status(404).json({
        message: "WishList not found",
      });
    }

    res.status(200).json(wishList);
  } catch (err) {
    res.status(500).json({
      message: "Failed to retrieve wishlist",
    });
  }
};

export const addToWishList = async (req, res) => {
  try {
    const wishList = await WishList.findOne({ user: req.userId }).populate(
      "items.product"
    );

    if (!wishList) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    wishList.items.forEach((item) => {
      if (item.product._id.toString() === req.body.productId) {
        return res.status(400).json({
          message: "Product already in wishlist",
        });
      }
    });

    wishList.items.push({
      product: req.body.productId,
    });

    await wishList.save();

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
    const { productId } = req.body;
    const wishList = await WishList.findOne({ user: req.userId }).populate(
      "items.product"
    );

    if (!wishList) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    wishList.items.forEach(async (item) => {
      if (item.product._id.toString() === productId) {
        await wishList.updateOne({
          $pull: {
            items: { product: new mongoose.Types.ObjectId(productId) },
          },
        });
      }
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
