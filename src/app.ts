import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import authRoutes from "./routes/auth.route";
import { connectDB } from "./db";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false }));

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

//connect to database
connectDB();

app.use("/api/auth", authRoutes);

export default app;
