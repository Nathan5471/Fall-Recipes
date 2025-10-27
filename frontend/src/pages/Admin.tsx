import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getPendingApprovalRecipes,
  approveRecipe,
  rejectRecipe,
} from "../utils/RecipeAPIHandler";

export default function Admin() {
  interface Recipe {
    _id: string;
    title: string;
    ingredients: Array<{ ingredient: string; amount: string }>;
    instructions: string[];
    status: "pending" | "approved" | "rejected";
    rejectReason?: string;
    reapprovalMessage?: string;
    imageUrl: string;
    createdBy: string;
    createdAt: string;
  }
  const [pendingRecipes, setPendingRecipes] = useState<Recipe[]>([]);
  // The key will be the recipe ID, and it will store the rejection reasons
  const [rejectionReasons, setRejectionReasons] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const fetchPendingRecipes = async () => {
      try {
        const data = await getPendingApprovalRecipes();
        setPendingRecipes(data.recipes);
      } catch (error) {
        console.error("Error fetching pending recipes:", error);
      }
    };
    fetchPendingRecipes();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await approveRecipe(id);
      setPendingRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
    } catch (error) {
      console.error("Error approving recipe:", error);
    }
  };

  const handleReject = async (id: string) => {
    const reason = rejectionReasons[id];
    if (!reason) {
      alert("Please provide a rejection reason.");
      return;
    }
    try {
      await rejectRecipe(id, reason);
      setPendingRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
    } catch (error) {
      console.error("Error rejecting recipe:", error);
    }
  };

  const handleChangeRejectionReason = (id: string, reason: string) => {
    setRejectionReasons((prev) => ({ ...prev, [id]: reason }));
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-color-4 text-color-1">
      <div className="w-full h-16 grid grid-cols-3 bg-color-3">
        <div />
        <h1 className="text-3xl font-bold w-full items-center justify-center text-center flex">
          Fall Recipes | Admin
        </h1>
        <div className="w-full flex items-center justify-end pr-2">
          <Link
            to="/"
            className="bg-color-2 font-bold p-2 rounded-lg hover:scale-105 transition-transform"
          >
            Home
          </Link>
        </div>
      </div>
      <div className="w-full h-full overflow-y-auto p-4 flex">
        {pendingRecipes.length === 0 ? (
          <p className="text-center mt-6">
            Good job! There are no pending recipes for approval.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {pendingRecipes.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-color-3 p-4 rounded-lg flex flex-col"
              >
                <img
                  src={`${window.location.origin}${recipe.imageUrl}`}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <h2 className="text-2xl font-bold mt-2">{recipe.title}</h2>
                <p className="mt-2">Is this recipe fall themed?</p>
                <input
                  type="text"
                  placeholder="Rejection reason (if rejecting)"
                  className="mt-2 p-2 rounded-lg bg-color-2 w-full"
                  value={rejectionReasons[recipe._id] || ""}
                  onChange={(e) =>
                    handleChangeRejectionReason(recipe._id, e.target.value)
                  }
                />
                <div className="mt-2 flex flex-row">
                  <button
                    className="bg-green-500 text-white p-2 rounded-lg hover:scale-105 transition-transform w-full"
                    onClick={() => handleApprove(recipe._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded-lg hover:scale-105 transition-transform w-full ml-2"
                    onClick={() => handleReject(recipe._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
