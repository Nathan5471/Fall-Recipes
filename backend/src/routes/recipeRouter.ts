import express from "express";
import {
  createRecipe,
  approveRecipe,
  rejectRecipe,
  requestReapproval,
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

router.post("/approve/:id", authenticate, async (req: any, res: any) => {
  const { id } = req.params as { id: string };

  if (!id) {
    return res.status(400).json({ message: "Recipe ID is required" });
  }

  await approveRecipe(req, res);
});

router.post("/reject/:id", authenticate, async (req: any, res: any) => {
  const { id } = req.params as { id: string };
  const { reason } = req.body as { reason: string };

  if (!id || !reason) {
    return res
      .status(400)
      .json({ message: "Recipe ID and reason are required" });
  }

  await rejectRecipe(req, res);
});

router.post(
  "/request-reapproval/:id",
  authenticate,
  async (req: any, res: any) => {
    const { id } = req.params as { id: string };
    const { message } = req.body as { message: string };

    if (!id || !message) {
      return res
        .status(400)
        .json({ message: "Recipe ID and message are required" });
    }

    await requestReapproval(req, res);
  }
);

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
