import { config } from "dotenv";

config();

export const env = {
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET || "dev-test-secret",
    JWT_VALID_FOR: process.env.JWT_VALID_FOR || "30s",
}
