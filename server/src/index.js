const express = require("express");
const { db } = require("./config/db.config");
const { config } = require("./config/app.config");
const { expConfig } = require("./config/exp.config");
const { ErrorHandler } = require("./middlewares/error-handler");
const apiRoutes = require("./routes");
const { upload } = require("./middlewares/upload");

// Initialize Express app
const app = express();

// express middleware configurations
expConfig(app);

// routes
app.post("/api/v1/upload", upload.single("upload"), (req, res) => {
    console.log("File Data", req.body);
    if (req.file) {
        return res.status(201).json({
            status: true,
            message: "File Added Successfully.",
        });
    }
});

app.use(config.BASE_URL, apiRoutes);

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
