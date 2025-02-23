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
    // Orders/Purchase history
    orders: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        purchaseDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    // Additional fields like favorites, etc. can be added
  },
  { timestamps: true }
);

const Buyer = mongoose.model("User", userSchema);

export default Buyer;
