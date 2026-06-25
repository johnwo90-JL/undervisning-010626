import { config } from "../config/index.js";
import { login } from "../services/authentication.service.js";
import { createAuthToken } from "../services/jwt.service.js";
import { createRefreshToken } from "../services/refresh-token.service.js";


export const authnController = {
    /**
     * @param {import("express").Request} req Request
     * @param {import("express").Response} res Response
     */
    "[POST]/login": async (req, res) => {
        const { email, password } = req.body;
        const result = await login(email, password);
        
        if (!(result.success && result.verified)) {
            res.status(401).json({
                success: false,
                token: null
            });
            return;
        }

        const authToken = await createAuthToken(result.user);
        const refreshToken = await createRefreshToken(authToken);

        res.cookie("X-Refresh-Token", refreshToken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: config.env.NODE_ENV === "prod" || config.env.NODE_ENV === "production" || false,
        });

        res.status(200).json({ success: true, authToken });
    }
}