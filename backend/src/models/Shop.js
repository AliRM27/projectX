import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    location: {
      streetNameAndNumber: {
        type: String,
        required: true,
      },
      postalCode: {
        type: Number,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    contact: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;
