import express from "express";
import {
  forgotPassword,
  resetPassword,
  userSignIn,
  userSignOut,
  userSignUp,
} from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/sign-up", userSignUp);
router.post("/sign-in", userSignIn);
router.post("/sign-out", userSignOut);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
