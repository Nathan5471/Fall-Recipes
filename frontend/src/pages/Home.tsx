import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getAllRecipes } from "../utils/RecipeAPIHandler";
import Fuse from "fuse.js";

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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [fuse, setFuse] = useState<Fuse<Recipe> | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes();
        setRecipes(data.recipes);
        setFilteredRecipes(data.recipes);
        setFuse(
          new Fuse(data.recipes, {
            keys: ["title", "ingredients.ingredient"],
            threshold: 0.3,
          })
        );
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (fuse && query.trim() !== "") {
      const results = fuse.search(query);
      setFilteredRecipes(results.map((result) => result.item));
    } else {
      setFilteredRecipes(recipes);
    }
  };

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
      <div className="w-full h-full overflow-y-auto p-4 flex flex-col">
        {recipes.length === 0 ? (
          <p className="text-center mt-6">No recipes available.</p>
        ) : (
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search recipes..."
              className="mb-4 p-2 w-1/2 rounded-lg bg-color-2"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {filteredRecipes.length === 0 ? (
                <p className="text-center mt-6">No matching recipes found.</p>
              ) : (
                filteredRecipes.map((recipe) => (
                  <Link
                    to={`/recipe/${recipe._id}`}
                    key={recipe._id}
                    className="bg-color-2 rounded-lg p-2 hover:scale-105 transition-transform"
                  >
                    <img
                      src={`${window.location.origin}${recipe.imageUrl}`}
                      alt={recipe.title}
                      className="w-full h-48 object-cover rounded-lg mb-2"
                    />
                    <h2 className="text-2xl font-bold">{recipe.title}</h2>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
