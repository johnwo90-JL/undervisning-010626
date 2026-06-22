
import express, { json } from "express";

// Config
import { config } from "./config/index.js";

// Database provider
import { db } from "./providers/db.provider.js";

// Models
import { UserModel } from "./models/user.model.js";

// Routers
import { rootRouter } from "./router/root.router.js";
import { userRouter } from "./router/user.router.js";
import { useRequestId } from "./middlewares/use-request-id.middleware.js";
import { authnRouter } from "./router/authN.router.js";
import { Op } from "sequelize";

// Sync Database
// await db.sync();
// UserModel.create({
//     email: "admin@foobar.com",
//     password: "password1234",
//     lastLogin: Date.now()
// });

// UserModel.create({
//     email: "user@foobar.com",
//     password: "password1234",
//     lastLogin: Date.now()+9000
// });

// (await UserModel.findAll({
//     where: {
//         lastLogin: {
//             [Op.lt]: Date.now()
//         }
//     }
// })).forEach(e => e.destroy()); 

export const app = express();

const PORT = 3000;
const HOST = "0.0.0.0"; // "localhost" === "127.0.0.1"

// Setup - Plugins, middlewares, endepunkt/handler, sette opp lytting

// Plugins

app.use(json());
app.use(useRequestId);


// Middlewares


// Endpoints/Handlers

// Endpoint: `/`
app.use("/users", userRouter);
app.use("/auth", authnRouter);
app.use("/", rootRouter); // exampleMiddleware -> /[users, auth, ...]


// Lytting (Listening)

if (process.env.NODE_ENV !== "test") {
    console.log("Starting server...");
    app.listen(PORT, HOST, (err) => {
        if (err) {
            console.error("======= FATAL ERROR =======");
            console.error(err);
            process.exit(1);
        }

        console.log(`Server listening at ${HOST}:${PORT}`);
    });
}
