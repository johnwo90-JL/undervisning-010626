import { mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { Sequelize, DataTypes } from "sequelize";

const require = createRequire(import.meta.url);
const sequelizeConfig = require("../../.sequelizerc");

let tempDir;
let sequelize;

async function runMigrations() {
    tempDir = await mkdtemp(path.join(tmpdir(), "week3-migrations-"));
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: path.join(tempDir, "test.sqlite"),
        logging: false,
    });

    const queryInterface = sequelize.getQueryInterface();
    const migrationDirectory = sequelizeConfig["migrations-path"];
    const migrationFiles = (await readdir(migrationDirectory))
        .filter((file) => file.endsWith(".js"))
        .sort();

    for (const migrationFile of migrationFiles) {
        const migrationPath = path.join(migrationDirectory, migrationFile);
        const migration = (await import(pathToFileURL(migrationPath))).default;

        await migration.up(queryInterface, DataTypes);
    }
}

describe("database migrations", () => {
    afterEach(async () => {
        if (sequelize) {
            await sequelize.close();
            sequelize = undefined;
        }

        if (tempDir) {
            await rm(tempDir, { recursive: true, force: true });
            tempDir = undefined;
        }
    });

    it("runs Sequelize migrations against an empty SQLite database", async () => {
        await runMigrations();

        const tables = await sequelize.getQueryInterface().showAllTables();
        expect(tables).toEqual(expect.arrayContaining([
            "Users",
            "Roles",
            "RefreshTokens",
        ]));

        const refreshTokenColumns = await sequelize.getQueryInterface().describeTable("RefreshTokens");
        expect(refreshTokenColumns.userId).toBeDefined();
    });
});
