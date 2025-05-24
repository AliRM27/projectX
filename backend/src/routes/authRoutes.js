import express from "express";
import {
  register,
  login,
  refreshToken,
  requestReset,
  verifyOTP,
  resetPassword,
} from "../controllers/authController.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import checkAuth from "../middleware/checkRefreshToken.js";
import {
  registerValidations,
  loginValidations,
  emailValidations,
  passwordValidations,
} from "../validations/validations.js";

const router = express.Router();

router.post("/register", registerValidations, handleValidationErrors, register);
router.post("/login", loginValidations, handleValidationErrors, login);
router.post("/refresh-token", checkAuth, refreshToken);
router.post(
  "/request-reset",
  emailValidations,
  handleValidationErrors,
  requestReset
);
router.post("/verify-otp", verifyOTP);
router.post(
  "/reset-password",
  passwordValidations,
  handleValidationErrors,
  resetPassword
);

export default router;
