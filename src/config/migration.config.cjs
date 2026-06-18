require("dotenv").config();

const dialect = process.env.DB_DIALECT || "sqlite";
const storage = process.env.DB_STORAGE || "data/db.sqlite";

module.exports = {
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
        storage: process.env.DB_TEST_STORAGE || process.env.DB_STORAGE || "data/test.sqlite",
    },
    production: {
        dialect,
        storage,
    },
};
