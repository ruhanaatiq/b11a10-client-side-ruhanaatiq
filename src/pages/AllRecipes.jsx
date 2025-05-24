import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${baseUrl}/recipes`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Failed to fetch recipes", err));
  }, [baseUrl]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">All Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="card bg-base-100 shadow-md rounded-lg">
            <figure>
              <img
                src={recipe.image || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{recipe.title}</h3>
              <p className="text-sm text-gray-500">Cuisine: {recipe.cuisine}</p>
              <p className="text-sm">Prep Time: {recipe.prepTime} mins</p>
              <p className="text-sm">Likes: {recipe.likes || 0}</p>
              <Link to={`/recipe/${recipe._id}`} className="btn btn-outline btn-sm mt-2">
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
