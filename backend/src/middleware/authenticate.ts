import User from "../models/user";
import jwt from "jsonwebtoken";

const authenticate = async (req: any, res: any, next: any) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    console.error("JWT_SECRET is not defined in .env file");
    return res.status(500).json({ message: "Failed to authenticate user" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(500).json({ message: "Failed to authenticate user" });
  }
};

export default authenticate;
