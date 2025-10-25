import jwt from "jsonwebtoken";

const generateToken = (userId: string): string => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env file");
  }
  const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "90d" });
  return token;
};

export default generateToken;
