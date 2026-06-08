import { describe, expect, it, vi } from "vitest";
import request from "supertest";

import { useRequestId } from "../../src/middlewares/use-request-id.middleware.js";
import { app } from "../../src/index.js";


const middleware = useRequestId;

describe("useRequestId-middleware", async () => {
    it("should add a UUIDv4 to the request object, then call `next()`", () => {
        const req = {};
        const res = { setHeader: vi.fn() };
        const next = vi.fn();

        middleware(req, res, next);

        expect(req.id).toBeDefined();
        expect(req.id).toMatch(/\w{8}-\w{4}-4\w{3}-[aby89]\w{3}-\w{12}/gi);

        expect(next).toHaveBeenCalled();
        expect(res.setHeader).toHaveBeenCalled();
    });

    it("should attach a requestId to the request", async () => {
        const response = await request(app)
            .get("/users")
            .send();

        expect(response.headers["x-request-id"]).toBeDefined();
        expect(response.headers["x-request-id"]).toMatch(/\w{8}-\w{4}-4\w{3}-[aby89]\w{3}-\w{12}/gi);
    });
});

