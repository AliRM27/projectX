import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Links wishlist to a user
    required: true,
  },
  items: [
    {
      shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop", // Links to a product
        required: true,
      },
      dateAdded: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const WishList = mongoose.model("WishList", wishListSchema);
export default WishList;
