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
