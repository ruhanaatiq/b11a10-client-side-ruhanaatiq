import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const DashboardMyRecipes = () => {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    if (user?.email) {
      fetch(`${BASE_URL}/my-recipes?email=${user.email}`)
        .then(res => res.json())
        .then(data => setRecipes(data))
        .catch(() => toast.error("Failed to load your recipes"));
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      const res = await fetch(`${BASE_URL}/recipes/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Failed to delete");

      setRecipes(recipes.filter(r => r._id !== id));
      toast.success("Recipe deleted successfully");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      title: form.title.value,
      ingredients: form.ingredients.value.split(',').map(i => i.trim()),
      instructions: form.instructions.value,
      cuisineType: form.cuisine.value,
      preparationTime: parseInt(form.prepTime.value),
      categories: [form.category.value],
    };

    try {
      const res = await fetch(`${BASE_URL}/recipes/${selectedRecipe._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });

      if (!res.ok) throw new Error("Failed to update");

      toast.success("Recipe updated successfully");
      setRecipes(recipes.map(r => r._id === selectedRecipe._id ? { ...r, ...updated } : r));
      setSelectedRecipe(null);
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-orange-500">My Recipes (Dashboard View)</h1>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Cuisine</th>
              <th>Prep Time</th>
              <th>Likes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe, index) => (
              <tr key={recipe._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                </td>
                <td>{recipe.title}</td>
                <td>{recipe.cuisineType}</td>
                <td>{recipe.preparationTime} mins</td>
                <td>{recipe.likes || 0}</td>
                <td className="flex flex-col md:flex-row gap-2">
                  <Link to={`/recipes/${recipe._id}`} className="btn btn-sm bg-orange-600 text-white">
                    View
                  </Link>
                  <button onClick={() => setSelectedRecipe(recipe)} className="btn btn-sm btn-warning">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(recipe._id)} className="btn btn-sm btn-error">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {recipes.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No recipes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {selectedRecipe && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Recipe</h3>
            <form onSubmit={handleUpdate} className="space-y-2 mt-4">
              <input name="title" defaultValue={selectedRecipe.title} className="input input-bordered w-full" required />
              <input name="ingredients" defaultValue={Array.isArray(selectedRecipe.ingredients) ? selectedRecipe.ingredients.join(', ') : selectedRecipe.ingredients} className="input input-bordered w-full" required />
              <textarea name="instructions" defaultValue={selectedRecipe.instructions} className="textarea textarea-bordered w-full" required />
              <input name="cuisine" defaultValue={selectedRecipe.cuisineType} className="input input-bordered w-full" required />
              <input name="prepTime" defaultValue={selectedRecipe.preparationTime} className="input input-bordered w-full" required />
              <input name="category" defaultValue={selectedRecipe.categories?.[0]} className="input input-bordered w-full" required />

              <div className="modal-action">
                <button type="submit" className="btn btn-success">Save</button>
                <button type="button" onClick={() => setSelectedRecipe(null)} className="btn">Cancel</button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default DashboardMyRecipes;
