import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter";
import recipeRouter from "./routes/recipeRouter";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/recipes", recipeRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
