import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const MyRecipes = () => {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (user?.email) {
      fetch(`${BASE_URL}/my-recipes?email=${user.email}`)
        .then(res => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then(data => setRecipes(data))
        .catch(() => toast.error("Failed to load recipes"));
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${BASE_URL}/recipes/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Failed to delete");
      setRecipes(prev => prev.filter(r => r._id !== id));
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
      cuisine: form.cuisine.value,
      prepTime: form.prepTime.value,
      category: form.category.value
    };

    try {
      const res = await fetch(`${BASE_URL}/recipes/${selectedRecipe._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });

      if (!res.ok) throw new Error("Failed to update");

      toast.success("Recipe updated successfully");
      setRecipes(prev => prev.map(r => r._id === selectedRecipe._id ? { ...r, ...updated } : r));
      setSelectedRecipe(null);
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map(recipe => (
          <div key={recipe._id} className="card bg-base-100 shadow p-4">
            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded" />
            <h2 className="text-lg font-semibold">{recipe.title}</h2>
            <p><strong>Ingredients:</strong> {Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : recipe.ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
            <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
            <p><strong>Preparation Time:</strong> {recipe.prepTime} mins</p>
            <p><strong>Category:</strong> {recipe.category}</p>
            <p><strong>Likes:</strong> {recipe.likes}</p>

            <div className="flex gap-2 mt-2">
              <Link to={`/recipes/${recipe._id}`} className="btn btn-primary btn-sm">
                See Details
              </Link>
              <button onClick={() => setSelectedRecipe(recipe)} className="btn btn-warning btn-sm">Update</button>
              <button onClick={() => handleDelete(recipe._id)} className="btn btn-error btn-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Recipe</h3>
            <form onSubmit={handleUpdate} className="space-y-2 mt-2">
              <input name="title" defaultValue={selectedRecipe.title} className="input input-bordered w-full" required />
              <input name="ingredients" defaultValue={Array.isArray(selectedRecipe.ingredients) ? selectedRecipe.ingredients.join(', ') : selectedRecipe.ingredients} className="input input-bordered w-full" required />
              <textarea name="instructions" defaultValue={selectedRecipe.instructions} className="textarea textarea-bordered w-full" required></textarea>
              <input name="cuisine" defaultValue={selectedRecipe.cuisine} className="input input-bordered w-full" required />
              <input name="prepTime" defaultValue={selectedRecipe.prepTime} className="input input-bordered w-full" required />
              <input name="category" defaultValue={selectedRecipe.category} className="input input-bordered w-full" required />
              <div className="modal-action">
                <button type="submit" className="btn btn-success">Submit</button>
                <button type="button" onClick={() => setSelectedRecipe(null)} className="btn">Cancel</button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyRecipes;
