import { describe, expect, it } from "vitest";

import { UserAccessLevel } from "../../src/models/user.model.js";
import { UserSchema } from "../../src/schema/user.schema.js";

describe("UserSchema", () => {
    it("does not default a missing role while parsing request data", () => {
        const parsedUser = UserSchema.parse({
            email: "new@example.com",
            password: "secret123",
            lastLogin: Date.now(),
        });

        expect(parsedUser).not.toHaveProperty("role");
    });

    it("accepts documented role access levels", () => {
        for (const role of [
            UserAccessLevel.NOT_AUTHENTICATED,
            UserAccessLevel.USER,
            UserAccessLevel.ADMIN,
        ]) {
            const parsedUser = UserSchema.parse({
                email: "new@example.com",
                password: "secret123",
                role,
                lastLogin: Date.now(),
            });

            expect(parsedUser.role).toBe(role);
        }
    });
});
