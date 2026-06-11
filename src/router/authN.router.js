

import { Router } from "express";
import { authnController } from "../controllers/authN.controller.js";

export const authnRouter = Router();

authnRouter.post("/login", authnController["[POST]/login"]);