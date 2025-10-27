import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getRecipeById } from "../utils/RecipeAPIHandler";

export default function Recipe() {
  const { recipeId } = useParams() as { recipeId: string };
  const { user } = useAuth();
  interface Recipe {
    _id: string;
    title: string;
    ingredients: Array<{ ingredient: string; amount: string }>;
    instructions: string[];
    status: "pending" | "approved" | "rejected";
    imageUrl: string;
    createdBy: string;
    createdAt: string;
  }
  const [recipe, setRecipe] = useState<Recipe | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleFetchRecipeData = async () => {
      try {
        const data = await getRecipeById(recipeId);
        setRecipe(data.recipe);
      } catch (error) {
        console.error("Error fetching recipe data:", error);
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };
    if (recipeId && recipe === undefined) {
      handleFetchRecipeData();
    }
  });

  if (loading) {
    return (
      <div className="w-screen h-screen flex flex-col bg-color-4 text-color-1">
        <div className="w-full h-16 grid grid-cols-3 bg-color-3">
          <div />
          <Link
            to="/"
            className="text-3xl font-bold w-full items-center justify-center text-center flex hover:underline"
          >
            Fall Recipes
          </Link>
          <div className="w-full flex items-center justify-end pr-2">
            {user ? (
              <Link
                to="/create"
                className="bg-color-2 font-bold p-2 rounded-lg hover:scale-105 transition-transform"
              >
                Create
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-color-2 font-bold p-2 rounded-lg hover:scale-105 transition-transform"
              >
                Login
              </Link>
            )}
            {user?.accountType === "admin" && (
              <Link
                to="/admin"
                className="ml-2 bg-color-2 font-bold p-2 rounded-lg hover:scale-105 transition-transform"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (recipe === null) {
    return (
      <div className="w-screen h-screen flex flex-col bg-color-4 text-color-1">
        <div className="w-full h-16 grid grid-cols-3 bg-color-3">
          <div />
          <Link
            to="/"
            className="text-3xl font-bold w-full items-center justify-center text-center flex hover:underline"
          >
            Fall Recipes
          </Link>
          <div className="w-full flex items-center justify-end pr-2">
            {user ? (
              <Link
                to="/create"
                className="bg-color-2 font-bold p-2 rounded-lg hover:scale-105 transition-transform"
              >
                Create
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-color-2 font-bold p-2 rounded-lg hover:scale-105 transition-transform"
              >
                Login
              </Link>
            )}
            {user?.accountType === "admin" && (
              <Link
                to="/admin"
                className="ml-2 bg-color-2 font-bold p-2 rounded-lg hover:scale-105 transition-transform"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
        <div className="w-full h-full flex justify-center itmes-center">
          <p className="text-2xl">Recipe not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col bg-color-4 text-color-1">
      <div className="w-full h-16 grid grid-cols-3 bg-color-3">
        <div />
        <Link
          to="/"
          className="text-3xl font-bold w-full items-center justify-center text-center flex hover:underline"
        >
          Fall Recipes
        </Link>
        <div className="w-full flex items-center justify-end pr-2">
          {user ? (
            <Link
              to="/create"
              className="bg-color-2 font-bold p-2 rounded-lg hover:scale-105 transition-transform"
            >
              Create
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-color-2 font-bold p-2 rounded-lg hover:scale-105 transition-transform"
            >
              Login
            </Link>
          )}
          {user?.accountType === "admin" && (
            <Link
              to="/admin"
              className="ml-2 bg-color-2 font-bold p-2 rounded-lg hover:scale-105 transition-transform"
            >
              Admin
            </Link>
          )}
        </div>
      </div>
      <div className="w-screen h-full overflow-y-auto flex flex-row">
        <div className="w-1/3 flex flex-col items-center p-2">
          <h2 className="text-3xl font-bold mb-4">{recipe?.title}</h2>
          <img
            src={`${window.location.origin}${recipe?.imageUrl}`}
            alt={recipe?.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <div className="w-full overflow-y-auto">
            <h3 className="text-2xl font-bold mb-2">Ingredients</h3>
            <ul className="list-disc list-inside mb-4">
              {recipe?.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.amount} {ingredient.ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-2/3 flex flex-col overflow-y-auto p-2">
          <h3 className="text-2xl font-bold mb-2">Instructions</h3>
          <ol className="list-decimal list-inside">
            {recipe?.instructions.map((instruction, index) => (
              <li key={index} className="mb-2">
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
