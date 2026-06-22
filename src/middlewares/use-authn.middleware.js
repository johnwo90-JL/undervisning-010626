import { verifyAuthToken } from "../services/jwt.service.js";

export function useAuthentication(req, res, next) {
    const auth = req.headers["authorization"] || null;

    if (auth === null) {
        req.user = null;
        return next();
    }

    const [scheme, token] = auth.split(" ");

    if (scheme !== "Bearer" || !token) {
        res.status(401).json({
            success: false,
            error: {
                message: "Invalid authorization header",
            },
        });
        return;
    }

    try {
        const payload = verifyAuthToken(token);
        req.user = {
            id: payload.id,
            role: payload.role,
        };
    } catch {
        res.status(401).json({
            success: false,
            error: {
                message: "Invalid token",
            },
        });
        return;
    }

    next();
}

