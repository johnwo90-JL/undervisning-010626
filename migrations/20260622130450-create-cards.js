"use strict";

/** @type {import("sequelize-cli").Migration} */
export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Cards", {
            id: {
                allowNull: false,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
                type: Sequelize.UUID,
            },
            idProduct: {
                allowNull: false,
                type: Sequelize.BIGINT,
            },
            idCategory: {
                allowNull: false,
                type: Sequelize.BIGINT,
            },
            avg: {
                type: Sequelize.BIGINT,
            },
            low: {
                type: Sequelize.BIGINT,
            },
            trend: {
                type: Sequelize.BIGINT,
            },
            avg1: {
                type: Sequelize.BIGINT,
            },
            avg7: {
                type: Sequelize.BIGINT,
            },
            avg30: {
                type: Sequelize.BIGINT,
            },
            "avg-foil": {
                type: Sequelize.BIGINT,
            },
            "low-foil": {
                type: Sequelize.BIGINT,
            },
            "trend-foil": {
                type: Sequelize.BIGINT,
            },
            "avg1-foil": {
                type: Sequelize.BIGINT,
            },
            "avg7-foil": {
                type: Sequelize.BIGINT,
            },
            "avg30-foil": {
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
        await queryInterface.dropTable("Cards");
    },
};
