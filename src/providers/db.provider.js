import { Sequelize } from "sequelize";
import { config } from "../config/index.js";

export const db = new Sequelize({
    dialect: config.db.dialect,
    storage: config.db.storage, // In-memory `:memory:`
});
