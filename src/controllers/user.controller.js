
export const users = [{
    email: "foo@bar.com",
    password: "abc123",
    lastLogin: Date.now(),
}, {
    email: "foo2@bar.com",
    password: "abc1234",
    lastLogin: Date.now(),
}];

export const userController = {
    /**
     * @param {import("express").Request} req Request
     * @param {import("express").Response} res Response
     */
    "/": (req, res) => { 
        res.json(users); // TODO: Respond with a list of all active users
    },
    /**
     * @param {import("express").Request} req Request
     * @param {import("express").Response} res Response
     */
    "/active": (req, res) => {
        res.json(users); // TODO: Respond with a list of all active users
    },
}

