import express from "express";
import { signup, login } from "../controllers/authController";
import authenticate from "../middleware/authenticate";

const router = express.Router();

router.post("/signup", async (req: any, res: any) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  await signup(req, res);
});

router.post("/login", async (req: any, res: any) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  await login(req, res);
});

router.post("/logout", (req: any, res: any) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
});

router.get("/current", authenticate, (req: any, res: any) => {
  const user = req.user;
  return res
    .status(200)
    .json({
      user: { username: user.username, accountType: user.accountType },
      message: "User retrieved successfully",
    });
});

export default router;
