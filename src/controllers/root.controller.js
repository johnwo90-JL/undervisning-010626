
export const rootController = {
    /**
     * @param {import("express").Request} req Request
     * @param {import("express").Response} res Response
     */
    "/": (req, res) => {
        res.send("Hello, World!");
    }
}
