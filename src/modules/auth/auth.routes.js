import Router from "express";
import { loginUser, refreshToken, registerUser } from "./auth.controller.js";

const authRoutes = Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/refresh-token", refreshToken);
// authRoutes.post("/forgot-password", registerUser);

export default authRoutes;
