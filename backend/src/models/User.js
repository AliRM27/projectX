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
    phone: {
      type: String,
      unique: true,
    },
    location: {
      city: {
        type: String,
      },
      adress: {
        type: String,
      },
    },
    // Orders/Purchase history
    orders: [
      {
        orderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
          required: true,
        },
        purchasedDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    resetOTP: { type: String },
    otpExpiry: { type: Date },
  },
  { timestamps: true }
);

const Buyer = mongoose.model("User", userSchema);

export default Buyer;
