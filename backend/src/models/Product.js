import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Mysety Bag",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    oldPrice: {
      type: Number,
      required: true,
    },
    newPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    // category: {
    //   type: String,
    //   required: true,
    // },
    imageUrl: {
      type: String, // URL or file path for the image
      required: true,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop", // Reference to the shop who added the product
      required: true,
    },
    pickUpTime: {
      type: Date,
    },
    bagDetails: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
