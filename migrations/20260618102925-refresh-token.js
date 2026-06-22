"use strict";

/** @type {import("sequelize-cli").Migration} */
export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("RefreshTokens", {
            id: {
                allowNull: false,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
                type: Sequelize.UUID,
            },
            token: {
                unique: true,
                type: Sequelize.TEXT,
            },
            userId: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: "Users",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("RefreshTokens");
    },
};
