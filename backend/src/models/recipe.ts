import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageFilepath: { type: String, required: true },
  ingredients: [
    {
      ingredient: { type: String, required: true },
      amount: { type: String, required: true },
    },
  ],
  instructions: { type: [String], required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  rejectReason: { type: String },
  reapprovalMessage: { type: String },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export interface RecipeType extends mongoose.Document {
  title: string;
  imageFilepath: string;
  ingredients: Array<{ ingredient: string; amount: string }>;
  instructions: string[];
  status: "pending" | "approved" | "rejected";
  rejectReason?: string;
  reapprovalMessage?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

export default Recipe;
