import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountType: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = mongoose.model("User", userSchema);

export interface UserType extends mongoose.Document {
  username: string;
  password: string;
  accountType: "user" | "admin";
}

export default User;
