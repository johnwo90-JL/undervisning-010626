import z, { optional } from "zod";

export const UserSchema = 
    z.object({
        id: z.string().optional(), // TODO Oppgave, gjør "optional"
        email: z.email(),
        password: z.string(),
        lastLogin: z.coerce.number(),
    });

/*
    id: "abc123",
    email: "foo@bar.com",
    password: "abc123",
    lastLogin: Date.now(),
*/
