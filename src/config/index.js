import { db } from "./db.config.js";
import { env } from "./env.config.js";


export const config = {
    env,
    db
};

console.log(config);
