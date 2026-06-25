import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model.js";
import { createAuthToken, parseAuthToken, verifyAuthToken } from "./jwt.service.js";
import { createRefreshToken, getRefreshTokenByUser, validateRefreshToken } from "./refresh-token.service.js";
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


export async function refreshUserLogin(oldAuthToken, refreshToken) {
    // const user = verifyAuthToken(oldAuthToken); // FEIL: `verify` krever at token er gyldig, `decode` gjør ikke. Dette gjorde at vi aldri kom lengre enn dette siden token som må "refresh"-es alltid vil feile verifisering.
    const user = parseAuthToken(oldAuthToken);
    
    if (!(await validateRefreshToken(refreshToken, oldAuthToken))) { // FEIL: Manglet `oldAuthToken`
        throw new Error("Refresh token invalid.");
    }

    const refreshTokensFromDb = await getRefreshTokenByUser(user.id)
        .catch(() => { throw new Error("Failed to fetch data from DB."); });
    
    let success = false;
    for (const token of refreshTokensFromDb) {
        if (token.token === refreshToken) {
            success = true;
            break;
        }
    }

    if (!success) {
        throw new Error("Failed to verify refresh-token authenticity.");
    }
    console.log("User Object from Token:", user);

    const authToken = createAuthToken({dataValues: {...user}});

    return {
        authToken,
        refreshToken: await screateRefreshToken(authToken)
    }
}