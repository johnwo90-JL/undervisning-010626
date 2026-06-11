import { login } from "../services/authentication.service.js";


export const authnController = {
    /**
     * @param {import("express").Request} req Request
     * @param {import("express").Response} res Response
     */
    "[POST]/login": async (req, res) => {
        const { email, password } = req.body;

        console.log("Email:", email);
        console.log("Password:", password);
        
        const success = await login(email, password);

        res.status(200).json({ success });
    }
}