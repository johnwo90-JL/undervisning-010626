import z from "zod";

import { UserAccessLevel } from "../models/user.model.js";

export const UserSchema = 
    z.object({
        id: z.uuid().optional(),
        email: z.email(),
        password: z.string().min(1),
        role: z.coerce.number().int().min(UserAccessLevel.NOT_AUTHENTICATED).max(UserAccessLevel.ADMIN).optional(),
        lastLogin: z.coerce.number().optional(),
    });

/*
    id: "abc123",
    email: "foo@bar.com",
    password: "abc123",
    lastLogin: Date.now(),
*/
