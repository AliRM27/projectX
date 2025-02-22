import express from "express";
import { register, login, getMe } from "../controllers/authController.js";
import checkAuth from "../middleware/checkAuth.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import {
  registerValidations,
  loginValidations,
} from "../validations/validations.js";

const router = express.Router();

router.post("/register", registerValidations, handleValidationErrors, register);
router.post(
  "/login",
  loginValidations,
  handleValidationErrors,
  checkAuth,
  login
);
router.get("/me", checkAuth, getMe);

export default router;
