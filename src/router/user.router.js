import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { useAuthorization } from "../middlewares/use-authz.middleware.js";
import { UserAccessLevel } from "../models/user.model.js";

export const userRouter = Router();

userRouter.get("/", useAuthorization(UserAccessLevel.ADMIN), userController["/"]);
userRouter.post("/", userController["[POST]/"]);

userRouter.get("/active", userController["/active"]);
userRouter.get("/:id", userController["/:id"]);

// TODO: Add routes: POST `/register`, GET `/me`.