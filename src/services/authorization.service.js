import { db } from "../providers/db.provider.js";
import { UserModel } from "../models/user.model.js";

/**
 * @param {string} id The user-ID of the user we want to check if authorized
 * @param {number} requiredAccessLevel The required access level for the operation
 * @returns {boolean}
 */
export async function isAuthorized(id, requiredAccessLevel) {
    const userData = await UserModel.findByPk({
        where: {
            id
        }
    });

    return userData.dataValues["role"] >= requiredAccessLevel;
}