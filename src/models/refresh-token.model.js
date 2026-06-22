import { DataTypes } from "sequelize";
import { db } from "../providers/db.provider.js";


export const RefreshTokenModel = db.define("RefreshToken", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    token: {
        type: DataTypes.TEXT,
        unique: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
});

export function associateRefreshToken(UserModel) {
    RefreshTokenModel.belongsTo(UserModel, {
        as: "user",
        foreignKey: "userId",
    });
}
