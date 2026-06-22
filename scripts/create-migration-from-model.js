// Generated helper script.
//
// This file exists to show how migrations are produced from model definitions
// step by step, instead of hiding that flow behind Sequelize's built-in
// migration functionality.

import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();
const modelsDir = path.join(projectRoot, "src", "models");
const migrationsDir = path.join(projectRoot, "migrations");

const args = process.argv.slice(2);
const modelArg = args.find((arg) => !arg.startsWith("--"));
const nameArg = readOption("--name");
const outArg = readOption("--out");
const isDryRun = args.includes("--dry-run");

/**
 * Reads the value that follows a named command-line option.
 *
 * @param {string} optionName The option flag to find, such as "--name".
 * @returns {string | undefined} The option value, or undefined when the flag is absent.
 */
function readOption(optionName) {
    const optionIndex = args.indexOf(optionName);

    if (optionIndex === -1) {
        return undefined;
    }

    return args[optionIndex + 1];
}

/**
 * Converts a string to kebab-case for file names and loose model matching.
 *
 * @param {string} value The string to normalize.
 * @returns {string} The kebab-case version of the string.
 */
function toKebabCase(value) {
    return value
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();
}

/**
 * Formats a date as the timestamp prefix expected by Sequelize migration files.
 *
 * @param {Date} [date=new Date()] The date to format.
 * @returns {string} A YYYYMMDDHHmmss timestamp.
 */
function toMigrationTimestamp(date = new Date()) {
    const pad = (value) => String(value).padStart(2, "0");

    return [
        date.getFullYear(),
        pad(date.getMonth() + 1),
        pad(date.getDate()),
        pad(date.getHours()),
        pad(date.getMinutes()),
        pad(date.getSeconds()),
    ].join("");
}

/**
 * Checks whether a model matches a user-provided model name, table name, or model file name.
 *
 * @param {object} model The Sequelize model constructor to compare.
 * @param {string} model.name The model name.
 * @param {string} model.tableName The database table name.
 * @param {string} searchValue The command-line model search value.
 * @returns {boolean} True when the search value identifies the model.
 */
function matchesModel(model, searchValue) {
    const normalizedSearch = toKebabCase(searchValue);

    return [
        model.name,
        model.tableName,
        `${model.name}.model.js`,
        `${toKebabCase(model.name)}.model.js`,
        `${toKebabCase(model.tableName)}.model.js`,
    ].some((candidate) => toKebabCase(candidate) === normalizedSearch);
}

/**
 * Serializes a Sequelize attribute type into source code for a migration column.
 *
 * @param {object} attribute A Sequelize model attribute definition.
 * @returns {string} A Sequelize type expression.
 */
function serializeType(attribute) {
    const key = attribute.type?.key;

    if (attribute.primaryKey && key === "UUIDV4") {
        return "Sequelize.UUID";
    }

    const typeMap = {
        BIGINT: "Sequelize.BIGINT",
        BOOLEAN: "Sequelize.BOOLEAN",
        DATE: "Sequelize.DATE",
        DECIMAL: "Sequelize.DECIMAL",
        DOUBLE: "Sequelize.DOUBLE",
        FLOAT: "Sequelize.FLOAT",
        INTEGER: "Sequelize.INTEGER",
        NUMBER: "Sequelize.BIGINT",
        STRING: "Sequelize.STRING",
        TEXT: "Sequelize.TEXT",
        UUID: "Sequelize.UUID",
        UUIDV4: "Sequelize.UUID",
    };

    return typeMap[key] || `Sequelize.${key || "TEXT"}`;
}

/**
 * Serializes a Sequelize default value into source code for a migration column.
 *
 * @param {*} defaultValue The default value from a Sequelize attribute definition.
 * @returns {string | undefined} A Sequelize or JSON expression, or undefined when no default exists.
 */
function serializeDefaultValue(defaultValue) {
    if (!defaultValue) {
        return undefined;
    }

    if (defaultValue.key === "UUIDV4") {
        return "Sequelize.UUIDV4";
    }

    if (defaultValue.key) {
        return `Sequelize.${defaultValue.key}`;
    }

    return JSON.stringify(defaultValue);
}

/**
 * Serializes a Sequelize attribute definition into the body of a migration column object.
 *
 * @param {object} attribute A Sequelize model attribute definition.
 * @returns {string} Indented migration column properties.
 */
function serializeColumn(attribute) {
    const lines = [];

    if (attribute.allowNull === false || attribute.primaryKey) {
        lines.push("allowNull: false");
    }

    if (attribute.primaryKey) {
        lines.push("primaryKey: true");
    }

    if (attribute.autoIncrement) {
        lines.push("autoIncrement: true");
    }

    if (attribute.unique) {
        lines.push("unique: true");
    }

    const defaultValue = serializeDefaultValue(attribute.defaultValue);

    if (defaultValue) {
        lines.push(`defaultValue: ${defaultValue}`);
    }

    lines.push(`type: ${serializeType(attribute)}`);

    return lines.map((line) => `                ${line},`).join("\n");
}

/**
 * Renders a complete Sequelize migration module for creating and dropping a model table.
 *
 * @param {object} model The Sequelize model constructor to render a migration for.
 * @param {Function} model.getAttributes Returns the model's attribute definitions.
 * @param {string} model.tableName The table created by the migration.
 * @returns {string} The migration file contents.
 */
function renderMigration(model) {
    const attributes = model.getAttributes();
    const columns = Object.entries(attributes)
        .map(([columnName, attribute]) => {
            return `            ${columnName}: {\n${serializeColumn(attribute)}\n            },`;
        })
        .join("\n");

    return `"use strict";

/** @type {import("sequelize-cli").Migration} */
export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("${model.tableName}", {
${columns}
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("${model.tableName}");
    },
};
`;
}

/**
 * Imports every model file from src/models and returns exported Sequelize models.
 *
 * @returns {Promise<object[]>} Models that expose getAttributes and tableName.
 */
async function loadModels() {
    const entries = await fs.readdir(modelsDir, { withFileTypes: true });
    const modelFiles = entries
        .filter((entry) => entry.isFile() && entry.name.endsWith(".model.js"))
        .map((entry) => entry.name);
    const models = [];

    for (const fileName of modelFiles) {
        const fileUrl = pathToFileURL(path.join(modelsDir, fileName)).href;
        const imported = await import(fileUrl);

        for (const value of Object.values(imported)) {
            if (value?.getAttributes && value?.tableName) {
                models.push(value);
            }
        }
    }

    return models;
}

/**
 * Creates a migration file from the requested model, or prints it when --dry-run is used.
 *
 * @returns {Promise<void>}
 */
async function main() {
    if (!modelArg) {
        throw new Error("Usage: npm run db:migration:from-model -- <ModelName|model-file> [--name migration-name]");
    }

    const models = await loadModels();
    const model = models.find((candidate) => matchesModel(candidate, modelArg));

    if (!model) {
        const availableModels = models.map((candidate) => candidate.name).join(", ") || "none";
        throw new Error(`Could not find model "${modelArg}" in src/models. Available models: ${availableModels}`);
    }

    await fs.mkdir(migrationsDir, { recursive: true });

    const migrationName = nameArg || `create-${toKebabCase(model.tableName)}`;
    const fileName = `${toMigrationTimestamp()}-${toKebabCase(migrationName)}.js`;
    const migrationPath = outArg
        ? path.resolve(projectRoot, outArg)
        : path.join(migrationsDir, fileName);
    const migrationContent = renderMigration(model);

    if (isDryRun) {
        console.log(migrationContent);
        return;
    }

    await fs.writeFile(migrationPath, migrationContent, "utf8");

    console.log(`Created migration from ${model.name}: ${path.relative(projectRoot, migrationPath)}`);
}

main().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
