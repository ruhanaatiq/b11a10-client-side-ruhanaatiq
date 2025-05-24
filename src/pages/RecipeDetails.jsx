import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${BASE_URL}/recipes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recipe");
        return res.json();
      })
      .then((data) => setRecipe(data))
      .catch(() => toast.error("Could not load recipe"));
  }, [id, BASE_URL]);

  const handleLike = async () => {
    try {
      const res = await fetch(`${BASE_URL}/recipes/${id}/like`, {
        method: "PUT",
      });
      if (res.ok) {
        setRecipe((prev) => ({ ...prev, likes: (prev.likes || 0) + 1 }));
        toast.success("You liked this recipe!");
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error(err.message||"failed to like the recipe");
    }
  };

  if (!recipe) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow rounded-lg mt-10">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-3xl font-bold">{recipe.title}</h2>
      <p className="text-gray-600 mt-2"><strong>Cuisine:</strong> {recipe.cuisine || recipe.cuisineType}</p>
      <p><strong>Preparation Time:</strong> {recipe.prepTime || recipe.preparationTime} minutes</p>
      <p><strong>Categories:</strong> {recipe.categories?.join(", ") || recipe.category}</p>
      <p className="mt-4"><strong>Ingredients:</strong> {Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : recipe.ingredients}</p>
      <p className="mt-2"><strong>Instructions:</strong> {recipe.instructions}</p>

      <div className="mt-6 flex items-center gap-4">
        <button onClick={handleLike} className="btn btn-primary">
          👍 Like ({recipe.likes || 0})
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails;
