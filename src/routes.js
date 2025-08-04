import Router from "express";
import authRoutes from "./modules/auth/auth.routes";
import attendaceRoutes from "./modules/attendance/attendance.routes";
import classRoutes from "./modules/class/class.routes";
import majorRoutes from "./modules/major/major.routes";
import sessionRoutes from "./modules/session/session.routes";
import subjectRoutes from "./modules/subject/subject.routes";
import userRoutes from "./modules/user/user.routes";

const routes = Router();

routes.use("/auth", authRoutes);

routes.use("/classes", classRoutes);
routes.use("/majors", majorRoutes);
routes.use("/subjects", subjectRoutes);
routes.use("/sessions", sessionRoutes);
routes.use("/attendances", attendaceRoutes);
routes.use("/users", userRoutes);

export default routes;
