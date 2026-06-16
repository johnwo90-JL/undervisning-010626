import { config } from "dotenv";

config();

export const db = {
    dialect: process.env.DB_DIALECT,
}