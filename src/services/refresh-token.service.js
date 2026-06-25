import crypto from "node:crypto";
import { config } from "../config/index.js";
import { RefreshTokenModel } from "../models/refresh-token.model.js";
import { parseAuthToken } from "./jwt.service.js";



export async function createRefreshToken(authToken, dryRun = false) {
    authToken = authToken.replaceAll("Bearer ", "");

    if (dryRun) {
        return crypto.hash("sha256", authToken + config.env.JWT_SECRET);
    }

    const user = parseAuthToken(authToken);

    console.log("createRefreshToken->user", user);

    if (!user) return null;

    const token = crypto.hash("sha256", authToken + config.env.JWT_SECRET);

    console.log("createRefreshToken->token", token);

    await RefreshTokenModel.create({
        token,
        userId: user.id
    });

    return token;
}

export async function validateRefreshToken(refreshToken, authToken) {
    const tempToken = await createRefreshToken(authToken, true);

    console.log("TempToken", tempToken);

    return tempToken === refreshToken;
}

export function getRefreshTokenByUser(userId) {
    const result = RefreshTokenModel.findAll({
        where: {
            userId
        }
    });

    return result;
}