import { describe, it, expect, test } from "vitest";


describe("`/users`-endpoint collection", async () => {
    const users = (await import("../../src/controllers/user.controller.js")).users;

    it("should have at least 2 users in `users`", async () => {
        expect(users.length).toBeGreaterThanOrEqual(2);
    });

    it("first user has email \"foo@bar.com\"", async () => {
        expect(users[0].email).toBe("foo@bar.com");
    });

    it.todo("If 2nd element is \"foo2@bar.com\"", async () => {
        expect(users[1].email).not.toBe("foo2@bar.com");
    })
});