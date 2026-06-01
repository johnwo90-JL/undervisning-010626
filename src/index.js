
import express from "express";

const app = express();

const PORT = 3000;
const HOST = "127.0.0.1"; // "localhost" === "127.0.0.1"


// Setup - Plugins, middlewares, endepunkt/handler, sette opp lytting

// Plugins

// Middlewares

// Endpoints/Handlers

// Lytting (Listening)

app.listen(PORT, HOST, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log(`Server listening at ${HOST}:${PORT}`);
})
