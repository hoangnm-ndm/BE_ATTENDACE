import Router from "express";
import { loginUser, registerUser } from "./auth.controller.js";

const authRoutes = Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
// authRoutes.post("/forgot-password", registerUser);

export default authRoutes;
