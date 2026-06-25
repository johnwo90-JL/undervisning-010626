import cookieParser from "cookie-parser";
import { verifyAuthToken } from "../services/jwt.service.js";
import { validateRefreshToken } from "../services/refresh-token.service.js";
import { refreshUserLogin } from "../services/authentication.service.js";
import { config } from "../config/index.js";


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {*} next 
 * @returns 
 */
export async function useAuthentication(req, res, next) {

    if (req.url === "/auth/login") return next();

    let auth = req.headers["authorization"] || req.cookies["X-Auth-Token"] || null;

    console.log("Auth:", auth);

    if (auth === null) {
        req.user = null;
        return next();
    }

    if (!auth.startsWith("Bearer")) auth = "Bearer " + auth;

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
    } catch (err) {
        console.log("Verify auth token error:", err);

        console.log("Checking refresh token...")
        const refreshResult = await refreshUserLogin(authToken, req.cookies["X-Refresh-Token"])
            .catch((err) => {
                console.log("[Refresh token]: Could not refresh user login!", err);
                
                res.clearCookie("X-Auth-Token");
                res.clearCookie("X-Refresh-Token");
                
                res.status(401).json({
                    success: false,
                    error: {
                        message: "Invalid token",
                        "internal-message": err
                    },
                });
            });

        console.log("Refresh result:", refreshResult);
        
        if (!refreshResult?.refreshToken) return;

        
        res.cookie("X-Refresh-Token", refreshResult.refreshToken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: config.env.NODE_ENV === "prod" || config.env.NODE_ENV === "production" || false,
        });

        res.cookie("X-Auth-Token", "Bearer " + refreshResult.authToken, {
            maxAge: 3 * 60 * 60 * 1000,
            httpOnly: true,
            secure: config.env.NODE_ENV === "prod" || config.env.NODE_ENV === "production" || false,
        });

        // req.cookies["X-Refresh-Token"] = refreshResult.refreshToken;
        // req.cookies["X-Auth-Token"] = "Bearer " + refreshResult.authToken;

        return res.sendStatus(426);
    }

    next();
}

