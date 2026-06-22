/**
 * A middleware that attaches a request-ID (UUIDv4) to an incoming request
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 */
export function useAuthorization(requiredAccessLevel) {
    return function (req, res, next) {
        if (req.user["RAL"] < requiredAccessLevel) {
            res.status(403);
            res.json({
                success: false,
                error: {
                    message: "Unauthorized",
                }
            });
            return;
        }
        
        next();
    }
}

