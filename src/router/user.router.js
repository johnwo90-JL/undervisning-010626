import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { useAuthorization } from "../middlewares/use-authz.middleware.js";

export const userRouter = Router();

userRouter.get("/", useAuthorization(3), userController["/"]);
userRouter.post("/", userController["[POST]/"]);

userRouter.get("/active", userController["/active"]);
userRouter.get("/:id", userController["/:id"]);
