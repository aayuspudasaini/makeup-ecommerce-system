const express = require("express");
const { db } = require("./config/db.config");
const { config } = require("./config/app.config");
const { expConfig } = require("./config/exp.config");
const { ErrorHandler } = require("./middlewares/error-handler");

// Initialize Express app
const app = express();

// express middleware configurations
expConfig(app);

app.get("/", (req, res) => {
    return res.status(200).send({
        message: "Hello",
    });
});

// global Error Handler
app.use(ErrorHandler);

// Server Listen Configurations
app.listen(config.PORT, async () => {
    console.log(
        `Successfully running on ${config.NODE_ENV} environment on port:${config.PORT}`
    );
    // database connection
    await db.connect(config.MONGO_URL);
});
