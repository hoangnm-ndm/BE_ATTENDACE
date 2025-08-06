import express from "express";
import * as classController from "./class.controller.js";
import { createClassSchema, updateClassSchema } from "./class.schema.js";
import { verifyUser, restrictTo } from "../../common/middlewares/auth.middleware.js";
import validBodyRequest from "../../common/middlewares/valid-body.middleware.js";
import { RoleEnum } from "../../common/constants/enum.js";

const classRoutes = express.Router();

// * Public routes (accessible to all authenticated users)
// * Có thể bổ sung thêm tính năng chỉ cho học viên hoặc sinh viên xem thông tin lớp mình.
classRoutes.get("/", classController.getAllClasses);
classRoutes.get("/:id", classController.getClassById);

// * SuperAdmin routes (restricted to superAdmin role)
classRoutes.use(verifyUser);
classRoutes.use(restrictTo(RoleEnum.SUPER_ADMIN));
classRoutes.post("/", validBodyRequest(createClassSchema), classController.createClass);
classRoutes.patch("/:id", validBodyRequest(updateClassSchema), classController.updateClass);
classRoutes.patch("/soft-delete/:id", classController.softDeleteClass);
classRoutes.patch("/restore/:id", classController.restoreClass);
classRoutes.delete("/:id", classController.deleteClass);

export default classRoutes;
