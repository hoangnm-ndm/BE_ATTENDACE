import Router from "express";
import { forgotPassword, loginUser, refreshToken, registerUser, resetPassword } from "./auth.controller.js";

const authRoutes = Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/refresh-token", refreshToken);
authRoutes.post("/forgot-password", forgotPassword);
authRoutes.post("/reset-password", resetPassword);

export default authRoutes;
