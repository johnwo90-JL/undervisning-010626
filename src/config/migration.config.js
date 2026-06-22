import { config } from "./index.js"; 

const { dialect, storage } = config.db;

export default {
    dev: {
        dialect,
        storage,
    },
    development: {
        dialect,
        storage,
    },
    test: {
        dialect,
        storage: process.env.DB_TEST_STORAGE ?? process.env.DB_STORAGE ?? "data/test.sqlite", // Fallback in case test-runner is isolating modules
    },
    production: {
        dialect,
        storage,
    },
};
