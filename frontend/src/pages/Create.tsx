import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../utils/RecipeAPIHandler";
import { IoTrash } from "react-icons/io5";

export default function Create() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([
    { ingredient: "", amount: "" },
  ]);
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChageImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        setImageFile(null);
        setImagePreview(null);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleClickImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleCreateRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      setError("Please upload an image for the recipe.");
      return;
    }
    const recipeData = new FormData();
    recipeData.append("title", title);
    recipeData.append("ingredients", JSON.stringify(ingredients));
    recipeData.append("instructions", JSON.stringify(instructions));
    recipeData.append("image", imageFile);

    try {
      await createRecipe(recipeData);
      navigate("/");
    } catch (error: unknown) {
      const errorMessage =
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string"
          ? error.message
          : "An unknown error occurred.";
      setError(errorMessage);
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-color-4 text-color-1 p-4">
      <form
        className="w-100 p-4 bg-color-3 rounded-lg flex flex-col"
        onSubmit={handleCreateRecipe}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Create Recipe</h2>
        <label htmlFor="title" className="mb-1 text-xl">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 rounded-lg bg-color-2"
          placeholder="Enter recipe title"
          required
        />
        <label htmlFor="ingredients" className="mb-1 text-xl">
          Ingredients
        </label>
        <div className="flex flex-row mb-2 mr-4">
          <label className="w-1/2 text-center">Ingredient</label>
          <label className="w-1/2 text-center">Amount</label>
        </div>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex flex-row mb-2">
            <input
              type="text"
              value={ingredient.ingredient}
              onChange={(e) => {
                const newIngredients = [...ingredients];
                newIngredients[index].ingredient = e.target.value;
                setIngredients(newIngredients);
              }}
              placeholder="Ingredient"
              className="w-1/2 bg-color-2 rounded-lg p-2"
            />
            <input
              type="text"
              value={ingredient.amount}
              onChange={(e) => {
                const newIngredients = [...ingredients];
                newIngredients[index].amount = e.target.value;
                setIngredients(newIngredients);
              }}
              placeholder="Amount"
              className="w-1/2 bg-color-2 ml-1 rounded-lg p-2"
            />
            <button
              type="button"
              onClick={() => {
                if (ingredients.length === 1) return;
                const newIngredients = [...ingredients];
                setIngredients(newIngredients.filter((_, i) => i !== index));
              }}
              className="ml-2 text-lg hover:scale-105 transition-transform"
            >
              <IoTrash />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            setIngredients([...ingredients, { ingredient: "", amount: "" }]);
          }}
          className="bg-color-2 font-bold p-2 rounded-lg hover:scale-105 transition-transform mb-2"
        >
          Add Ingredient
        </button>
        <label htmlFor="instructions" className="mb-1 text-xl">
          Instructions
        </label>
        {instructions.map((instruction, index) => (
          <div key={index} className="flex flex-row mb-2">
            <p className="text-lg mr-2">{index + 1}.</p>
            <textarea
              id="instruction"
              name="instruction"
              value={instruction}
              onChange={(e) => {
                const newInstructions = [...instructions];
                newInstructions[index] = e.target.value;
                setInstructions(newInstructions);
              }}
              className="w-full p-2 rounded-lg bg-color-2"
              placeholder={`Enter instruction #${index + 1}`}
            />
            <button
              type="button"
              onClick={() => {
                if (instructions.length === 1) return;
                const newInstructions = [...instructions];
                setInstructions(newInstructions.filter((_, i) => i !== index));
              }}
              className="ml-2 text-lg hover:scale-105 transition-transform"
            >
              <IoTrash />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            setInstructions([...instructions, ""]);
          }}
          className="bg-color-2 font-bold p-2 rounded-lg hover:scale-105 transition-transform mb-2"
        >
          Add Instruction
        </button>
        <label htmlFor="image" className="mb-1 text-xl">
          Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleChageImage}
          ref={imageRef}
          className="hidden"
        />
        {imagePreview ? (
          <div className="relative w-full aspect-video group mt-1">
            <img
              src={imagePreview}
              alt="Select Screenshot Preview"
              onClick={handleClickImage}
              className="w-full aspect-video object-cover"
            />
            <div
              onClick={handleClickImage}
              className="absolute inset-0 bg-black/0 group-hover:bg-black/35 flex cursor-pointer items-center justify-center"
            >
              <span className="text-gray-200/0 font-medium text-3xl group-hover:text-gray-200">
                Change Image
              </span>
            </div>
          </div>
        ) : (
          <div
            onClick={handleClickImage}
            className="flex w-full aspect-video bg-color-2 hover:scale-105 transition-transform cursor-pointer items-center justify-center text-center mt-1"
          >
            <p className="text-2xl">Upload Screenshot</p>
          </div>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          className="bg-color-2 font-bold p-2 rounded-lg hover:scale-105 transition-transform mt-4"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
}
