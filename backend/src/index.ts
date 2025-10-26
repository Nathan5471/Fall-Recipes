import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter";
import recipeRouter from "./routes/recipeRouter";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
