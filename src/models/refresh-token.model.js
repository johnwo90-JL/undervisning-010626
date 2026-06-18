import { DataTypes } from "sequelize";
import { db } from "../providers/db.provider.js";


export const RefreshTokenModel = db.define("RefreshToken", {
    id: {
        primaryKey: true,
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
    },
    token: {
        type: DataTypes.TEXT,
        unique: true,
    },
});

