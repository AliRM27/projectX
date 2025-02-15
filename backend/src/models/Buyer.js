import mongoose from "mongoose";

const buyerSchema = new mongoose.Schema(
  {
    fullName: {
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
    // Additional fields like favorites, purchase history, etc. can be added
  },
  { timestamps: true }
);

const Buyer = mongoose.model("Buyer", buyerSchema);

export default Buyer;
