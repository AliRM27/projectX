import mongoose from "mongoose";
const sellerSchema = new mongoose.Schema({
  name: {
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
  shops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop", // A seller can own multiple shops
    },
  ],
});

const Seller = mongoose.model("Seller", sellerSchema);
export default Seller;
