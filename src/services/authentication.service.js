import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model.js";
// import { users } from "../controllers/user.controller.js";

const saltOrRounds = 12;

export async function hashPassword(pw) {
    return bcrypt.hash(pw, saltOrRounds);
}

export async function verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
}

export async function verifyUserExists(email) {
    return (await UserModel.findAndCountAll({
        where: {
            email
        }
    })).count === 1;
}

export async function getUser(email) {
    return (await UserModel.findOne({
        where: {
            email
        }
    }));
}

export async function login(email, password) {
    const user = await getUser(email);

    if (user === null) {
        return {
            success: true,
            verified: false,
            user: null
        };
    }

    const verified = await verifyPassword(password, user.password);

    return { 
        success: true,
        verified,
        user,
    }
}
