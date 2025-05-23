import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import userRoutes from "./routes/auth-router.js";
import errorHandler from "./middlewares/error-handler.js";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://quiz-app-green-five.vercel.app"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(morgan("dev"));
app.set("trust proxy", 1);
app.use(helmet());

// api routes
app.use("/api/users", userRoutes);

app.use(errorHandler);

// server running
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

server.on("Server error:", console.error);
