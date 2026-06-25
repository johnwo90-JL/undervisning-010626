"use strict";

/** @type {import("sequelize-cli").Migration} */
export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
                type: Sequelize.UUID,
            },
            email: {
                unique: true,
                type: Sequelize.TEXT,
            },
            password: {
                type: Sequelize.TEXT,
            },
            role: {
                allowNull: false,
                defaultValue: 1,
                type: Sequelize.INTEGER,
            },
            lastLogin: {
                type: Sequelize.BIGINT,
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
        await queryInterface.dropTable("Users");
    },
};
