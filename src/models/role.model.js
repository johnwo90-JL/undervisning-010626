import { DataTypes } from "sequelize";
import { db } from "../providers/db.provider.js";


export const Role = db.define("Role", {
    id: {
        primaryKey: true,
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
    },
    label: {
        type: DataTypes.TEXT,
        unique: true,
    },
    level: {
        type: DataTypes.NUMBER,
        unique: true,
    }
});

