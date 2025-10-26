import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRouter from "./routes/authRouter";
import recipeRouter from "./routes/recipeRouter";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const MONGOOSE_URL = process.env.MONGOOSE_URL;

if (!MONGOOSE_URL) {
  throw new Error("MONGOOSE_URL is not defined in environment variables");
}

const app = express();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/recipes", recipeRouter);
app.use("/api/images", express.static("uploads"));

// Frontend
app.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:5173",
    changeOrigin: true,
  })
);

mongoose
  .connect(MONGOOSE_URL)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
