import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.get("/", userController["/"]);
userRouter.get("/active", userController["/active"]);
// userRouter.post("/", userController["/create"]);



// `[server]:3000/users/active`
