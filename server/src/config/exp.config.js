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

    // Increase the request size limit for body-parser
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

    app.use("/public", express.static("public"));

    app.use(helmet());
    app.use(
        cors({
            credentials: true,
            origin: config.FRONTEND_ORIGIN_URL,
        })
    );
    app.use(cookieParser());

    // Logging API Routes
    if (config.NODE_ENV === "development") {
        app.use(morgan("dev"));
    }
};

module.exports = { expConfig };
