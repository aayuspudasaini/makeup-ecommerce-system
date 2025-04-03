const express = require("express");
const { config } = require("./config/app.config");
const { db } = require("./config/db.config");
const { expConfig } = require("./config/exp.config.js");
const ErrorHandler = require("./middlewares/error-handler");

// Initialize Express app
const app = express();

// express middleware configurations
expConfig(app);

// Routes
// app.use(config.BASE_URL, apiRoutes);

// console.log(config.BASE_URL)
app.get(config.BASE_URL, (req, res, next) => {
   return res.send({ message: "Hello" });
});

// global Error Handler
// app.use(ErrorHandler);

// Server Listen Configurations
app.listen(config.PORT, async () => {
   console.log(
      `Successfully running on ${config.NODE_ENV} environment on port:${config.PORT}`
   );
   // database connection
   await db.connect(config.MONGO_URL);
});
