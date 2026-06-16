import { DataTypes, Model } from "sequelize";
import { db } from "../providers/db.provider.js";


export const UserModel = db.define("User", {
    id: {
        primaryKey: true,
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
    },
    email: {
        type: DataTypes.TEXT,
        unique: true,
    },
    password: {
        type: DataTypes.TEXT,
    },
    lastLogin: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
});

