import { DataTypes } from "sequelize";
import { db } from "../providers/db.provider.js";


// FIX: Migrations don't preserve quotes; fix.

export const CardModel = db.define("Card", {
    id: {
        primaryKey: true,
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
    },
    idProduct: {
        type: DataTypes.NUMBER,
        allowNull: false,
        unique: true,
    },
    idCategory: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    avg: DataTypes.NUMBER,
    low: DataTypes.NUMBER,
    trend: DataTypes.NUMBER,
    avg1: DataTypes.NUMBER,
    avg7: DataTypes.NUMBER,
    avg30: DataTypes.NUMBER,
    "avg-foil": DataTypes.NUMBER,
    "low-foil": DataTypes.NUMBER,
    "trend-foil": DataTypes.NUMBER,
    "avg1-foil": DataTypes.NUMBER,
    "avg7-foil": DataTypes.NUMBER,
    "avg30-foil": DataTypes.NUMBER
});