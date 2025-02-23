import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true, // Store address
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // A shop can have multiple products
      },
    ],
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String, // URL or file path for the image
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller", // Owner of the shop
      required: true,
      max: 1,
      default: 1,
    },
  },
  { timestamps: true }
);

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;
