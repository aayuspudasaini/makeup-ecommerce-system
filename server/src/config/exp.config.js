const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { config } = require("./app.config");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const expConfig = (app) => {
    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/public", express.static("public"));

    app.use(helmet());
    app.use(
        cors({
            credentials: true,
            origin: config.FRONTEND_ORIGIN_URL,
        })
    );

    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cookieParser());

    // Logging API Routes
    if (config.NODE_ENV === "development") {
        app.use(morgan("dev"));
    }
};

module.exports = { expConfig };
