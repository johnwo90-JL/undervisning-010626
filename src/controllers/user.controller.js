import { ZodError } from "zod";

import { UserModel } from "../models/user.model.js";
import { UserSchema } from "../schema/user.schema.js";
import { hashPassword, verifyUserExists } from "../services/authentication.service.js";

function toUserDto(user) {
    const values = user.dataValues ?? user;

    return {
        id: values.id,
        email: values.email,
        role: values.role,
        lastLogin: Number(values.lastLogin),
        createdAt: values.createdAt,
        updatedAt: values.updatedAt,
    };
}

function sendControllerError(res, error) {
    if (error instanceof ZodError) {
        res.status(400).json({
            success: false,
            error: {
                message: "Invalid user data",
                issues: error.issues,
            },
        });
        return;
    }

    res.status(500).json({
        success: false,
        error: {
            message: "Internal server error",
        },
    });
}

async function sendUserById(userId, res) {
    const user = await UserModel.findByPk(userId);

    if (user === null) {
        res.status(404).json({
            success: false,
            error: {
                message: "User not found",
            },
        });
        return;
    }

    res.json({
        success: true,
        data: toUserDto(user),
    });
}

export const userController = {
    /**
     * @param {import("express").Request} req Request
     * @param {import("express").Response} res Response
     */
    "/": async (_req, res) => {
        const users = await UserModel.findAll({
            order: [["createdAt", "ASC"]],
        });

        res.json({
            success: true,
            data: users.map(toUserDto),
        });
    },

    /**
     * @param {import("express").Request} req Request
     * @param {import("express").Response} res Response
     */
    "[POST]/": async (req, res) => {
        try {
            const parsedBody = UserSchema.parse({
                ...req.body,
                lastLogin: Date.now(),
            });

            if (await verifyUserExists(parsedBody.email)) {
                res.status(409).json({
                    success: false,
                    error: {
                        message: "A user with that email already exists",
                    },
                });
                return;
            }

            const user = await UserModel.create({
                email: parsedBody.email,
                password: await hashPassword(parsedBody.password),
                role: parsedBody.role,
                lastLogin: parsedBody.lastLogin,
            });

            res.status(201).json({
                success: true,
                data: toUserDto(user),
            });
        } catch (error) {
            sendControllerError(res, error);
        }
    },

    /**
     * @param {import("express").Request} req Request
     * @param {import("express").Response} res Response
     */
    "/:id": async (req, res) => {
        await sendUserById(req.params.id, res);
    },

    /**
     * @param {import("express").Request} req Request
     * @param {import("express").Response} res Response
     */
    "/me": async (req, res) => {
        await sendUserById(req.user.id, res);
    },

    /**
     * @param {import("express").Request} req Request
     * @param {import("express").Response} res Response
     */
    "/active": async (_req, res) => {
        const users = await UserModel.findAll({
            order: [["lastLogin", "DESC"]],
        });

        res.json({
            success: true,
            data: users.map(toUserDto),
        });
    },
}
