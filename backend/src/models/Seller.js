import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference to Product model
      },
    ],
    // Additional fields like product listings, business ratings, etc., can be added
  },
  { timestamps: true }
);

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;
