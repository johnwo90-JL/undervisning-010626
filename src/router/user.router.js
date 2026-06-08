import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.get("/", userController["/"]);
userRouter.post("/", userController["[POST]/"]); // TODO Oppgave
userRouter.post("/:id", userController["/:id"]); // TODO Leave for now, revert to GET soon-ish

userRouter.get("/active", userController["/active"]);
// userRouter.post("/", userController["/create"]);



// `[server]:3000/users/active`
