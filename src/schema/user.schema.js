import z from "zod";

export const UserSchema = 
    z.object({
        id: z.uuid().optional(),
        email: z.email(),
        password: z.string().min(1),
        role: z.coerce.number().int().min(1).default(1),
        lastLogin: z.coerce.number(),
    });

/*
    id: "abc123",
    email: "foo@bar.com",
    password: "abc123",
    lastLogin: Date.now(),
*/
