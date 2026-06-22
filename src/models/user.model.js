import { DataTypes } from "sequelize";
import { db } from "../providers/db.provider.js";
import { RefreshTokenModel, associateRefreshToken } from "./refresh-token.model.js";
import { hashPassword } from "../services/authentication.service.js";

export const UserAccessLevel = Object.freeze({
    NOT_AUTHENTICATED: 0,
    USER: 1,
    ADMIN: 2,
});

export const UserAccessLevelLabel = Object.freeze({
    [UserAccessLevel.NOT_AUTHENTICATED]: "Not authenticated",
    [UserAccessLevel.USER]: "User",
    [UserAccessLevel.ADMIN]: "Admin",
});

const hashPasswordHook = async (user) => {
    if (!user.changed("password")) {
        return;
    }

    user.password = await hashPassword(user.password);
}

export const UserModel = db.define("User", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    email: {
        type: DataTypes.TEXT,
        unique: true,
    },
    password: {
        type: DataTypes.TEXT,
    },
    role: {
        type: DataTypes.INTEGER,
        defaultValue: UserAccessLevel.USER,
        allowNull: false,
        comment: "Access level: 0 = Not authenticated, 1 = User, 2 = Admin",
        validate: {
            min: UserAccessLevel.NOT_AUTHENTICATED,
            max: UserAccessLevel.ADMIN,
        },
    },
    lastLogin: {
        type: DataTypes.BIGINT,
    }
}, {
    hooks: {
        beforeCreate: hashPasswordHook,
        beforeUpdate: hashPasswordHook,
    }
});



UserModel.hasMany(RefreshTokenModel, {
    as: "refreshTokens",
    foreignKey: "userId",
});

associateRefreshToken(UserModel);
