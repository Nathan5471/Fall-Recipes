import User from "../models/user";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";

export const signup = async (req: any, res: any) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const userCount = await User.countDocuments();
    const hashedPassword = await bcrypt.hash(password, 10);
    if (userCount === 0) {
      await User.create({
        username,
        password: hashedPassword,
        accountType: "admin",
      });
      console.log("Creating first user as admin");
      return res.status(201).json({ message: "User created successfully" });
    }
    await User.create({ username, password: hashedPassword });
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error signing up user:", error);
    return res.status(500).json({ message: "Failed to signup user" });
  }
};

export const login = async (req: any, res: any) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const token = generateToken(user._id.toString());
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Failed to login user" });
  }
};
