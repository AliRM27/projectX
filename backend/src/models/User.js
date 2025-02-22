import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    // Additional fields like favorites, purchase history, etc. can be added
  },
  { timestamps: true }
);

const Buyer = mongoose.model("User", userSchema);

export default Buyer;
