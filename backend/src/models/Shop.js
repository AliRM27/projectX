import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String, // URL or file path for the image
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    pickUpTime: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;
