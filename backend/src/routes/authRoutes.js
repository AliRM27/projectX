import express from "express";
import { register, login } from "../controllers/authController.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import {
  registerValidations,
  loginValidations,
} from "../validations/validations.js";

const router = express.Router();

router.post("/register", registerValidations, handleValidationErrors, register);
router.post("/login", loginValidations, handleValidationErrors, login);

export default router;
