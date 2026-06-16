import { config } from "dotenv";

config();

export const env = {
    NODE_ENV: process.env.NODE_ENV,
}