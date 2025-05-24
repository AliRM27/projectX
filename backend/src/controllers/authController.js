import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import WishList from "../models/WishList.js";
import { sendEmail } from "../utils/sendEmail.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      fullName,
      password: hashedPassword,
      email,
      phone: "",
      location: {},
      orders: [],
    });

    // Create a cart for the user
    const newCart = new Cart({ user: newUser._id, items: [], totalPrice: 0 });

    // Create a wishlist for the user
    const newWishList = new WishList({ user: newUser._id, items: [] });

    await newWishList.save();
    await newCart.save();
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, fullName, email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
    console.log(error);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    }); // 1 hour expiry for access token
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    }); // 30 days expiry for refresh token

    const { password: hashedPassword, ...UserData } = user._doc;

    res.status(200).json({
      message: "Login successful",
      user: UserData,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      // Create a new access token if the refresh token is valid
      const newAccessToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Respond with the new access token
      res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to refresh token", error: error.message });
  }
};
export const requestReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP and expiry
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
    const otpExpiry = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes

    // Save OTP & expiry in DB (you'll implement this soon)
    user.resetOTP = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP via email
    await sendEmail(
      email,
      "Password Reset Code",
      `Your OTP for password reset is: ${otp}\nIt will expire in 2 minutes.`
    );

    res.status(200).json({
      success: true,
      message: "OTP sent to email",
    });
  } catch (error) {
    res.status(500).json({ message: "Request reset failed", error: error.message });
  }
};
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.resetOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    user.resetOTP = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({
      valid: true,
      message: "OTP verified successfully",
      userId: user._id, // You can use this to reset the password later
    });
    
  }
  catch (error) {
    res.status(500).json({ message: "OTP verification failed", error: error.message });
  }
}
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "User ID and new password are required" });
    }

    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.resetOTP = undefined;
    user.otpExpiry = undefined;
    
    await user.save();

    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Password reset failed", error: error.message });
  }
};