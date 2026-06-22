import { config } from "dotenv";

config();

export const env = {
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET || "dev-test-secret",
}
