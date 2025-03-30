import express from "express";
import { config } from "./config/app.config";
import { db } from "./config/db.config";

const app = express();

// Routes

// Global Error Handler

// Server Configuration
app.listen(config.PORT, async () => {
   console.log(
      `Successfully running on port:${config.PORT} in ${config.NODE_ENV}`
   );

   // database connection
   await db.connect(config.MONGO_URL);
});
