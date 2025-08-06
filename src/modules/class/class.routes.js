import Router from "express";
import { RoleEnum } from "../../common/constants/enum";
import * as classControllers from "./class.controller";
import { verifyUser, restrictTo } from "../../common/middlewares/auth.middleware";
import validBodyRequest from "../../common/middlewares/valid-body.middleware";
import { createClassSchema } from "./class.schema";

const classRoutes = Router();

classRoutes.use(verifyUser);
classRoutes.post(
	"/",
	restrictTo([RoleEnum.SUPER_ADMIN]),
	validBodyRequest(createClassSchema),
	classControllers.createClass
);

export default classRoutes;
