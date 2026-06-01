import { Router } from "express";
import { rootController } from "../controllers/root.controller.js";

export const rootRouter = Router();

rootRouter.get("/", rootController["/"]);
