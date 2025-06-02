import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import WishList from "../models/WishList.js";
import { sendEmail } from "../utils/sendEmail.js";
import { OAuth2Client } from "google-auth-library";
import crypto from "crypto";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const newUser = new User({
      fullName,
      password: hashedPassword,
      email,
      phone: "",
      location: {},
      orders: [],
      verificationToken,
      verificationTokenExpiry,
      isEmailVerified: false,
    });

    // Create a wishlist for the user
    const newWishList = new WishList({ user: newUser._id, items: [] });

    await newWishList.save();
    await newUser.save();

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    await sendEmail(
      email,
      "Verify Your Email",
      `Please click the following link to verify your email: ${verificationUrl}\n\nThis link will expire in 24 hours.`
    );

    res.status(201).json({
      message:
        "User registered successfully. Please check your email to verify your account.",
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

    // Check if email is verified
    if (!user.isEmailVerified) {
      // Generate a new verification token if the old one is expired or doesn't exist
      if (
        !user.verificationToken ||
        new Date() > user.verificationTokenExpiry
      ) {
        const verificationToken = crypto.randomBytes(32).toString("hex");
        const verificationTokenExpiry = new Date(
          Date.now() + 24 * 60 * 60 * 1000
        ); // 24 hours

        user.verificationToken = verificationToken;
        user.verificationTokenExpiry = verificationTokenExpiry;
        await user.save();

        // Send new verification email
        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
        await sendEmail(
          email,
          "Verify Your Email",
          `Please click the following link to verify your email: ${verificationUrl}\n\nThis link will expire in 24 hours.`
        );
      }

      return res.status(403).json({
        message:
          "Please verify your email before logging in. A new verification email has been sent.",
        isEmailVerified: false,
        email: user.email,
      });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

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
    res
      .status(500)
      .json({ message: "Request reset failed", error: error.message });
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "OTP verification failed", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "User ID and new password are required" });
    }

    const user = await User.findOne({ email });
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
    res
      .status(500)
      .json({ message: "Password reset failed", error: error.message });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      console.error("No token provided in request");
      return res.status(400).json({ message: "Token is required" });
    }

    console.log("Received token:", token.substring(0, 20) + "...");
    console.log("Using Google Client ID:", process.env.GOOGLE_CLIENT_ID);

    try {
      // Get user info using the access token
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!userInfoResponse.ok) {
        throw new Error("Failed to fetch user info from Google");
      }

      const payload = await userInfoResponse.json();
      console.log("Google payload:", {
        email: payload.email,
        name: payload.name,
        sub: payload.sub,
      });

      if (!payload) {
        return res.status(400).json({ message: "Invalid token payload" });
      }

      const { email, name, sub: googleId } = payload;

      if (!email || !name || !googleId) {
        return res.status(400).json({
          message: "Missing required user information from Google",
          received: { email: !!email, name: !!name, googleId: !!googleId },
        });
      }

      // Check if user exists
      let user = await User.findOne({ email });
      console.log("Existing user:", user ? "Found" : "Not found");

      if (!user) {
        // Create new user if doesn't exist
        user = new User({
          email,
          fullName: name,
          googleId,
          phone: "",
          location: {},
          orders: [],
        });

        // Create a wishlist for the user
        const newWishList = new WishList({ user: user._id, items: [] });
        await newWishList.save();

        await user.save();
        console.log("New user created:", user._id);
      } else if (!user.googleId) {
        // If user exists but hasn't used Google auth before, link their account
        user.googleId = googleId;
        await user.save();
        console.log("Existing user linked with Google:", user._id);
      }

      // Generate JWT tokens
      const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      const { password: hashedPassword, ...userData } = user._doc;

      res.status(200).json({
        message: "Google authentication successful",
        user: userData,
        accessToken,
        refreshToken,
      });
    } catch (verifyError) {
      console.error("Token verification error:", {
        message: verifyError.message,
        stack: verifyError.stack,
      });
      return res.status(400).json({
        message: "Token verification failed",
        error: verifyError.message,
      });
    }
  } catch (error) {
    console.error("Google Auth Error Details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    res.status(500).json({
      message: "Google authentication failed",
      error: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired verification token",
      });
    }

    user.isEmailVerified = true;
    user.verificationToken = "";
    user.verificationTokenExpiry = undefined;
    await user.save();

    res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Email verification failed",
      error: error.message,
    });
  }
};
