import { DataTypes } from "sequelize";
import { db } from "../providers/db.provider.js";
import { RefreshTokenModel, associateRefreshToken } from "./refresh-token.model.js";


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
        defaultValue: 1,
        allowNull: false,
    },
    lastLogin: {
        type: DataTypes.BIGINT,
    }
});

UserModel.hasMany(RefreshTokenModel, {
    as: "refreshTokens",
    foreignKey: "userId",
});

associateRefreshToken(UserModel);
