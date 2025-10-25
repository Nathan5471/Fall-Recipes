import Recipe from "../models/recipe";
import { UserType } from "../models/user";

export const createRecipe = async (req: any, res: any) => {
  const { title, ingredients, instructions } = req.body as {
    title: string;
    ingredients: Array<{ ingredient: string; amount: string }>;
    instructions: string[];
  };
  const user = req.user as UserType;

  try {
    await Recipe.create({
      title,
      ingredients,
      instructions,
      createdBy: user._id,
    });
    return res.status(201).json({ message: "Recipe created successfully" });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return res.status(500).json({ message: "Failed to create recipe" });
  }
};

export const getAllRecipes = async (req: any, res: any) => {
  try {
    const recipes = await Recipe.find({ status: "approved" }).populate(
      "createdBy",
      "username"
    );
    return res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return res.status(500).json({ message: "Failed to fetch recipes" });
  }
};

export const getPendingApprovalRecipes = async (req: any, res: any) => {
  const user = req.user as UserType;

  if (user.accountType !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {
    const recipes = await Recipe.find({ status: "pending" }).populate(
      "createdBy",
      "username"
    );
    return res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching pending approval recipes:", error);
    return res.status(500).json({ message: "Failed to fetch recipes" });
  }
};

export const getRejectedRecipesByUser = async (req: any, res: any) => {
  const user = req.user as UserType;

  try {
    const recipes = await Recipe.find({
      status: "rejected",
      createdBy: user._id,
    }).populate("createdBy", "username");
    return res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching rejected recipes:", error);
    return res.status(500).json({ message: "Failed to fetch recipes" });
  }
};

export const getRecipeById = async (req: any, res: any) => {
  const { id } = req.params as { id: string };

  try {
    const recipe = await Recipe.findById(id).populate("createdBy", "username");
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    return res.status(200).json(recipe);
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    return res.status(500).json({ message: "Failed to fetch recipe" });
  }
};
