import Router from "express";

import { registerUser } from "./auth.controller.js";

const authRoutes = Router();

authRoutes.post("/register", registerUser);
// authRoutes.post("/login", registerUser);
// authRoutes.post("/forgot-password", registerUser);

export default authRoutes;
