import { uuidv4 } from "../utils/uuid.util.js";

/**
 * A middleware that attaches a request-ID (UUIDv4) to an incoming request
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 */
export function useRequestId(req, res, next) {
    req.id = uuidv4();
    res.setHeader("X-Request-Id", req.id);
    
    next();
}