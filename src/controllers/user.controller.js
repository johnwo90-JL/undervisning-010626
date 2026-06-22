import { UserModel } from "../models/user.model.js";
import { UserSchema } from "../schema/user.schema.js";

// export const users = [{
//     id: "abc123",
//     email: "foo@bar.com",
//     password: "$2b$12$GgS1hQuNY42BYunHxYjfCeQ6PHQ5dsMeSEJTYLn9N2vhOKAp7RZke",
//     lastLogin: Date.now(),
// }, {
//     id: "foobar123",
//     email: "foo2@bar.com",
//     password: "$2b$12$7oSp9aFce4nZf8PJwQEpdu0c8.ZXstvnEXvd9BJZ/G3OGnAuwxoMC",
//     lastLogin: Date.now(),
// }];

// Validate user-objects
// users.forEach(user => UserSchema.parse(user));
// console.log(`Validated ${users.length} user objects.`);

export const userController = {
    /**
     * @param {import("express").Request} req Request
     * @param {import("express").Response} res Response
     */
    "/": (req, res) => { 
        res.json(users); // TODO: Respond with a list of all active users
    },

     // TODO Oppgave, legg til tilfeldig generert `id` i brukerobjektet; forsikre at det ikke opprettes duplikat, basert på e-postadresse.
    /**
     * @param {import("express").Request} req Request
     * @param {import("express").Response} res Response
     */
    "[POST]/": async (req, res) => {
        const tba = {
        ...req.body,
            lastLogin: Date.now()
        };
        req.parsedBody = UserSchema.parse(tba);

        console.log(tba);
        const result = await UserModel.create();

        res.status(201).json({
            success: true,
            _insertedData: result
        });
    },

    /**
     * @param {import("express").Request} req Request
     * @param {import("express").Response} res Response
     */
    "/:id": (req, res) => {
        console.log("Query string[foo]:", req.query.foo);
        console.log("Body:", req.body);
        res.json(users.filter(e => e.id === req.params.id));
    },

    /**
     * @param {import("express").Request} req Request
     * @param {import("express").Response} res Response
     */
    "/active": (req, res) => {
        res.json(users); // TODO: Respond with a list of all active users
    },
}
