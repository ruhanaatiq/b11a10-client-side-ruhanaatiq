import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, [id]);

  const handleLike = async () => {
    try {
      const res = await fetch(`http://localhost:5000/recipes/${id}/like`, {
        method: "PUT",
      });
      if (res.ok) {
        setRecipe((prev) => ({ ...prev, likes: (prev.likes || 0) + 1 }));
        toast.success("You liked this recipe!");
      }
    } catch (err) {
      toast.error("Failed to like the recipe");
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
      <p className="text-gray-600 mt-2"><strong>Cuisine:</strong> {recipe.cuisine}</p>
      <p><strong>Preparation Time:</strong> {recipe.prepTime} minutes</p>
      <p><strong>Categories:</strong> {recipe.categories?.join(", ")}</p>
      <p className="mt-4"><strong>Ingredients:</strong> {recipe.ingredients}</p>
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
