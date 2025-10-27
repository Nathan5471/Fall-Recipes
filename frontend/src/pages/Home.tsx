import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getAllRecipes } from "../utils/RecipeAPIHandler";

export default function Home() {
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
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes();
        setRecipes(data.recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col bg-color-4 text-color-1">
      <div className="w-full h-16 grid grid-cols-3 bg-color-3">
        <div />
        <h1 className="text-3xl font-bold w-full items-center justify-center text-center flex">
          Fall Recipes
        </h1>
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
      <div className="w-full h-full overflow-y-auto p-4 flex flex-col">
        {recipes.length === 0 ? (
          <p className="text-center mt-6">No recipes available.</p>
        ) : (
          <div className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Search recipes..."
              className="mb-4 p-2 w-1/2 rounded-lg bg-color-2"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {recipes.map((recipe) => (
                <Link
                  to={`/recipe/${recipe._id}`}
                  key={recipe._id}
                  className="bg-color-2 rounded-lg p-2"
                >
                  <img
                    src={`${window.location.origin}${recipe.imageUrl}`}
                    alt={recipe.title}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
