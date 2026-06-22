import { beforeAll, beforeEach, afterAll, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../../src/index.js";
import { db } from "../../src/providers/db.provider.js";
import { UserModel } from "../../src/models/user.model.js";
import { RefreshTokenModel } from "../../src/models/refresh-token.model.js";
import { createAuthToken } from "../../src/services/jwt.service.js";
import { verifyPassword, hashPassword } from "../../src/services/authentication.service.js";

async function createUser(overrides = {}) {
    return UserModel.create({
        email: overrides.email ?? "admin@example.com",
        password: overrides.password ?? await hashPassword("secret123"),
        role: overrides.role ?? 3,
        lastLogin: overrides.lastLogin ?? Date.now(),
    });
}

describe("users API", () => {
    beforeAll(async () => {
        await db.sync({ force: true });
    });

    beforeEach(async () => {
        await RefreshTokenModel.destroy({ truncate: true, force: true });
        await UserModel.destroy({ truncate: true, force: true });
    });

    afterAll(async () => {
        await db.close();
    });

    it("creates a user with a hashed password and returns a safe DTO", async () => {
        const response = await request(app)
            .post("/users")
            .send({
                email: "new@example.com",
                password: "secret123",
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toMatchObject({
            email: "new@example.com",
            role: 1,
        });
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.password).toBeUndefined();

        const savedUser = await UserModel.findOne({ where: { email: "new@example.com" } });
        expect(savedUser).not.toBeNull();
        expect(savedUser.password).not.toBe("secret123");
        expect(await verifyPassword("secret123", savedUser.password)).toBe(true);
    });

    it("rejects invalid user input with 400", async () => {
        const response = await request(app)
            .post("/users")
            .send({
                email: "not-an-email",
                password: "secret123",
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it("rejects duplicate email with 409", async () => {
        await createUser({ email: "duplicate@example.com" });

        const response = await request(app)
            .post("/users")
            .send({
                email: "duplicate@example.com",
                password: "secret123",
            });

        expect(response.statusCode).toBe(409);
        expect(response.body.success).toBe(false);
    });

    it("rejects listing users without a token", async () => {
        const response = await request(app).get("/users");

        expect(response.statusCode).toBe(401);
    });

    it("rejects listing users with an insufficient role", async () => {
        const user = await createUser({ email: "basic@example.com", role: 1 });
        const token = await createAuthToken(user);

        const response = await request(app)
            .get("/users")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(403);
    });

    it("lists users for role level 3 tokens", async () => {
        const admin = await createUser({ email: "admin@example.com", role: 3 });
        await createUser({ email: "user@example.com", role: 1 });
        const token = await createAuthToken(admin);

        const response = await request(app)
            .get("/users")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveLength(2);
        expect(response.body.data[0].password).toBeUndefined();
    });

    it("returns an active user by id", async () => {
        const user = await createUser({ email: "single@example.com", role: 1 });

        const response = await request(app).get(`/users/${user.id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toMatchObject({
            id: user.id,
            email: "single@example.com",
        });
        expect(response.body.data.password).toBeUndefined();
    });

    it("logs in with valid credentials and rejects invalid credentials", async () => {
        await createUser({
            email: "login@example.com",
            password: await hashPassword("correct-password"),
            role: 3,
        });

        const success = await request(app)
            .post("/auth/login")
            .send({
                email: "login@example.com",
                password: "correct-password",
            });

        expect(success.statusCode).toBe(200);
        expect(success.body.success).toBe(true);
        expect(success.body.token).toEqual(expect.any(String));

        const failure = await request(app)
            .post("/auth/login")
            .send({
                email: "login@example.com",
                password: "wrong-password",
            });

        expect(failure.statusCode).toBe(401);
        expect(failure.body.success).toBe(false);
    });

    it("creates refresh tokens through the user relationship", async () => {
        const user = await createUser({ email: "tokens@example.com" });

        const refreshToken = await user.createRefreshToken({
            token: "refresh-token-value",
        });

        expect(refreshToken.userId).toBe(user.id);

        const tokens = await user.getRefreshTokens();
        expect(tokens).toHaveLength(1);
        expect(tokens[0].token).toBe("refresh-token-value");
    });
});
