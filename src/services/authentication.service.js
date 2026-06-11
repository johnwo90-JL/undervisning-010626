import bcrypt from "bcrypt";
import { users } from "../controllers/user.controller.js";

const saltOrRounds = 12;

export async function hashPassword(pw) {
    return bcrypt.hash(pw, saltOrRounds);
}

export async function verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
}

export function verifyUser(email) {
    return users.filter(e => e.email === email).length === 1;
    let foo = saltOrRounds;
}

export function getUser(email) {
    return users.filter(e => e.email === email)[0] ?? null;
}

export async function login(email, password) {
    const user = getUser(email);

    if (user === null) {
        return false;
    }

    return verifyPassword(password, user.password);
}
