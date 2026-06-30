import jwt from "jsonwebtoken";

import { UserModel } from "../models/user.model.js";
import { Model } from "sequelize";
import { config } from "../config/index.js";

/**
 * @param {Model<UserModel>} user 
 */
export async function createAuthToken(user) {
    if (user === null) {
        return null;
    }

    return jwt.sign({
        id: user.dataValues["id"],
        role: user.dataValues["role"],
    }, config.env.JWT_SECRET, {
        expiresIn: config.env.JWT_VALID_FOR
    });
}

export function verifyAuthToken(token) {
    return jwt.verify(token, config.env.JWT_SECRET);
}

export function parseAuthToken(token) {
    return jwt.decode(token, config.env.JWT_SECRET);
}
