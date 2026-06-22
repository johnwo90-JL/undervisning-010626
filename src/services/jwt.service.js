import jwt from "jsonwebtoken";

import { UserModel } from "../models/user.model.js";
import { Model } from "sequelize";

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
    }, "test");
}