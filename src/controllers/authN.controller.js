import { login } from "../services/authentication.service.js";
import { createAuthToken } from "../services/jwt.service.js";


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

        const token = await createAuthToken(result.user);

        res.status(200).json({ success: true, token });
    }
}