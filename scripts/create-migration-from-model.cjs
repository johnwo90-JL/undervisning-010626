const fs = require("fs/promises");
const path = require("path");
const { pathToFileURL } = require("url");

const projectRoot = process.cwd();
const modelsDir = path.join(projectRoot, "src", "models");
const migrationsDir = path.join(projectRoot, "migrations");

const args = process.argv.slice(2);
const modelArg = args.find((arg) => !arg.startsWith("--"));
const nameArg = readOption("--name");
const outArg = readOption("--out");
const isDryRun = args.includes("--dry-run");

function readOption(optionName) {
    const optionIndex = args.indexOf(optionName);

    if (optionIndex === -1) {
        return undefined;
    }

    return args[optionIndex + 1];
}

function toKebabCase(value) {
    return value
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();
}

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

function renderMigration(model, moduleFormat = "commonjs") {
    const attributes = model.getAttributes();
    const columns = Object.entries(attributes)
        .map(([columnName, attribute]) => {
            return `            ${columnName}: {\n${serializeColumn(attribute)}\n            },`;
        })
        .join("\n");
    const exportStart = moduleFormat === "esm" ? "export default {" : "module.exports = {";

    return `"use strict";

/** @type {import("sequelize-cli").Migration} */
${exportStart}
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
    const fileName = `${toMigrationTimestamp()}-${toKebabCase(migrationName)}.cjs`;
    const migrationPath = outArg
        ? path.resolve(projectRoot, outArg)
        : path.join(migrationsDir, fileName);
    const moduleFormat = path.extname(migrationPath) === ".js" ? "esm" : "commonjs";
    const migrationContent = renderMigration(model, moduleFormat);

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
