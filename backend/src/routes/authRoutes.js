import express from "express";
import { register, login, refreshToken } from "../controllers/authController.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import checkAuth from "../middleware/checkAuth.js";
import {
  registerValidations,
  loginValidations,
} from "../validations/validations.js";

const router = express.Router();

router.post("/register", registerValidations, handleValidationErrors, register);
router.post("/login", loginValidations, handleValidationErrors, login);
router.post("/refresh-token", checkAuth, refreshToken);


export default router;
