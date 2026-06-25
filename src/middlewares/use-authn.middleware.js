import cookieParser from "cookie-parser";
import { verifyAuthToken } from "../services/jwt.service.js";
import { validateRefreshToken } from "../services/refresh-token.service.js";
import { refreshUserLogin } from "../services/authentication.service.js";

export async function useAuthentication(req, res, next) {
    const auth = req.headers["authorization"] || null;

    if (auth === null) {
        req.user = null;
        return next();
    }

    const [scheme, authToken] = auth.split(" ");

    if (scheme !== "Bearer" || !authToken) {
        res.status(401).json({
            success: false,
            error: {
                message: "Invalid authorization header",
            },
        });
        return;
    }

    try {
        const payload = verifyAuthToken(authToken);
        req.user = {
            id: payload.id,
            role: payload.role,
        };
    } catch {
        console.log("Checking refresh token...")
        const refreshResult = await refreshUserLogin(authToken, req.cookies["X-Refresh-Token"])
            .catch((err) => {
                console.log("[Refresh token]: Could not refresh user login!", err);
                res.status(401).json({
                    success: false,
                    error: {
                        message: "Invalid token",
                        "internal-message": err
                    },
                });
            });

        if (!refreshResult?.refreshToken) return;
        
        res.cookie("X-Refresh-Token", refreshResult.refreshToken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: config.env.NODE_ENV === "prod" || config.env.NODE_ENV === "production" || false,
        });

        return;
    }

    next();
}

