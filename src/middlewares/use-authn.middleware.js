/**
 * A middleware that attaches a request-ID (UUIDv4) to an incoming request
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 */
export function useAuthentication(req, res, next) {
    const auth = req.headers["authorization"] || req.headers["www-authenticate"] || null;

    if (auth === null) {
        req.user = null;
        return next();
    }

    req.user = 

    next();
}

