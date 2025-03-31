import express from "express";
import cors from "cors"; // Cross-Origin Resource Sharing middleware
import helmet from "helmet"; // Security middleware
import cookieParser from "cookie-parser";
import { config } from "./config/app.config";
import { db } from "./config/db.config";
import authRouter from "./routes/authRouter"

const app = express();

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use("/auth",authRouter)
// Global Error Handler

// Server Configuration
app.listen(config.PORT, async () => {
   console.log(
      `Successfully running on port:${config.PORT} in ${config.NODE_ENV}`
   );

   // database connection
   await db.connect(config.MONGO_URL);
});
