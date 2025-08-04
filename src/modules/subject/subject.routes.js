import Router from "express";
import * as subjectController from "./subject.controller";
import { restrictTo, verifyUser } from "../../common/middlewares/auth.middleware";
import { RoleEnum } from "../../common/constants/Enum";
import validBodyRequest from "../../common/middlewares/valid-body.middleware";
import { createSubjectSchema, updateSubjectSchema } from "./subject.schema.js";

const subjectRoutes = Router();

subjectRoutes.get("/", subjectController.getAllSubjects);
subjectRoutes.get("/:id", subjectController.getSubjectById);

subjectRoutes.use(verifyUser);
subjectRoutes.use(restrictTo(RoleEnum.SUPER_ADMIN));
subjectRoutes.post("/", validBodyRequest(createSubjectSchema), subjectController.createSubject);
subjectRoutes.path("/:id", validBodyRequest(updateSubjectSchema), subjectController.updateSubject);
subjectRoutes.patch("/:id/soft-delete", subjectController.softDeleteSubject);
subjectRoutes.patch("/:id/restore", subjectController.restoreSubject);
subjectRoutes.delete("/:id", subjectController.deleteSubject);

export default subjectRoutes;
