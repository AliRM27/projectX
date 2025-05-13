import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import WishList from "../models/WishList.js";

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
