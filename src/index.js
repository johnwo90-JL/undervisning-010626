
import express, { json } from "express";

// Config
import { config } from "./config/index.js";

// Database provider
import { db } from "./providers/db.provider.js";

// Models
import { UserModel } from "./models/user.model.js";

// Routers
import { rootRouter } from "./router/root.router.js";
import { usersRouter } from "./router/users.router.js";
import { useRequestId } from "./middlewares/use-request-id.middleware.js";
import { authnRouter } from "./router/authN.router.js";
import { useAuthentication } from "./middlewares/use-authn.middleware.js";
import { Op } from "sequelize";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import { RefreshTokenModel } from "./models/refresh-token.model.js";
import { cardsRouter } from "./router/cards.router.js";

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

app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "example.com"],
      },
    },
}));

app.use(cookieParser());

app.use(rateLimit({
    windowMs: 3000,
    limit: 3,
}));



// Middlewares
app.use(useRequestId);
app.use(useAuthentication);

// Endpoints/Handlers

// Endpoint: `/`
app.use("/users", usersRouter);
app.use("/auth", authnRouter);
app.use("/cards", cardsRouter);
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
