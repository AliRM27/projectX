import WishList from "../models/WishList.js";
import mongoose from "mongoose";

export const getWishList = async (req, res) => {
  try {
    const userId = req.userId;
    const wishList = await WishList.findOne({ user: userId }).populate(
      "items.shop"
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
      "items.shop"
    );

    if (!wishList) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    wishList.items.forEach((item) => {
      if (item.shop._id.toString() === req.body.shopId) {
        return res.status(400).json({
          message: "Shop already in wishlist",
        });
      }
    });

    wishList.items.push({
      shop: req.body.shopId,
    });

    await wishList.save();

    res.status(200).json({
      message: "Shop added to wishlist",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to add shop to wishlist",
    });
  }
};

export const removeFromWishList = async (req, res) => {
  try {
    const { shopId } = req.body;
    const wishList = await WishList.findOne({ user: req.userId }).populate(
      "items.shop"
    );

    if (!wishList) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    wishList.items.forEach(async (item) => {
      if (item.shop._id.toString() === shopId) {
        await wishList.updateOne({
          $pull: {
            items: { shop: new mongoose.Types.ObjectId(shopId) },
          },
        });
      }
    });

    return res.status(200).json({
      message: "Shop removed from wishlist",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to remove shop from wishlist",
    });
  }
};
