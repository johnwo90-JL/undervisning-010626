import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { useAuthorization } from "../middlewares/use-authz.middleware.js";
import { UserAccessLevel } from "../models/user.model.js";

export const usersRouter = Router();

usersRouter.get("/", useAuthorization(UserAccessLevel.ADMIN), userController["/"]);
usersRouter.post("/", userController["[POST]/"]); // deprecate?

usersRouter.get("/active", userController["/active"]);
usersRouter.post("/register", userController["[POST]/"]);
usersRouter.get("/me", useAuthorization(UserAccessLevel.USER), userController["/me"]);
usersRouter.get("/:id", userController["/:id"]);
