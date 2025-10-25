import express from "express";
import {
  createRecipe,
  getAllRecipes,
  getPendingApprovalRecipes,
  getRejectedRecipesByUser,
  getRecipeById,
} from "../controllers/recipeController";
import authenticate from "../middleware/authenticate";

const router = express.Router();

router.post("/create", authenticate, async (req: any, res: any) => {
  const { title, ingredients, instructions } = req.body as {
    title: string;
    ingredients: Array<{ ingredient: string; amount: string }>;
    instructions: string[];
  };

  if (!title || !ingredients || !instructions) {
    return res
      .status(400)
      .json({ message: "Title, ingredients, and instructions are required" });
  }

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res
      .status(400)
      .json({ message: "Ingredients must be a non-empty array" });
  }

  if (
    ingredients.some(
      (ingredient) => !ingredient.ingredient || !ingredient.amount
    )
  ) {
    return res.status(400).json({
      message:
        "Each ingredient must have both 'ingredient' and 'amount' in that object",
    });
  }

  if (!Array.isArray(instructions) || instructions.length === 0) {
    return res
      .status(400)
      .json({ message: "Instructions must be a non-empty array" });
  }

  await createRecipe(req, res);
});

router.get("/all", getAllRecipes);

router.get("/all/pending-approval", authenticate, getPendingApprovalRecipes);

router.get("/all/rejected", authenticate, getRejectedRecipesByUser);

router.get("/:id", async (req: any, res: any) => {
  const { id } = req.params as { id: string };

  if (!id) {
    return res.status(400).json({ message: "Recipe ID is required" });
  }

  await getRecipeById(req, res);
});

export default router;
