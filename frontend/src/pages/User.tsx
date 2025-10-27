import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getRecipesByUserId } from "../utils/RecipeAPIHandler";

export default function User() {
  const { userId } = useParams() as { userId: string };
  const { user } = useAuth();
  interface Recipe {
    _id: string;
    title: string;
    ingredients: Array<{ ingredient: string; amount: string }>;
    instructions: string[];
    status: "pending" | "approved" | "rejected";
    imageUrl: string;
    createdBy: { username: string; _id: string };
    createdAt: string;
  }
  const [username, setUsername] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const data = await getRecipesByUserId(userId);
        setUsername(data.username);
        setRecipes(data.recipes);
      } catch (error) {
        console.error("Error fetching user recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchUserRecipes();
    }
  }, [userId]);

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

  if (!username) {
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
        <div className="w-full h-full items-center justify-center flex">
          <p className="text-center mt-6">User not found.</p>
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
      <div className="w-full h-full overflow-y-auto p-4 flex flex-col">
        <h1 className="text-4xl font-bold mb-4 text-center">
          {username}'s Recipes
        </h1>
        {recipes.length === 0 ? (
          <p className="text-center mt-6">No recipes found for this user.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {recipes.map((recipe) => (
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
                <p className="mt-2">By {recipe.createdBy.username}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
