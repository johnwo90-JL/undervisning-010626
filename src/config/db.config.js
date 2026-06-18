import { config } from "dotenv";

config();

export const db = {
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE || "data/db.sqlite",
}
