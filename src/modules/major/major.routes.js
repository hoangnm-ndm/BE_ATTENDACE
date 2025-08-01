import { Router } from "express";
import * as majorController from "./major.controller.js";
import { createMajorSchema, updateMajorSchema } from "./major.schema.js";
import { restrictTo, verifyUser } from "../../common/middlewares/auth.middleware.js";
import validBodyRequest from "../../common/middlewares/valid-body.middleware.js";
import { RoleEnum } from "../../common/constants/Enum.js";

const majorRoutes = Router();

// Public routes (accessible to all authenticated users)
majorRoutes.get("/", majorController.getAllMajors);
majorRoutes.get("/:id", majorController.getMajorById);

// SuperAdmin routes (restricted to superAdmin role)
majorRoutes.use(verifyUser);
majorRoutes.use(restrictTo(RoleEnum.SUPER_ADMIN));
majorRoutes.post("/", validBodyRequest(createMajorSchema), majorController.createMajor);
majorRoutes.patch("/:id", validBodyRequest(updateMajorSchema), majorController.updateMajor);
majorRoutes.delete("/soft-delete/:id", majorController.softDeleteMajor);
majorRoutes.patch("/restore/:id", majorController.restoreMajor);

export default majorRoutes;
