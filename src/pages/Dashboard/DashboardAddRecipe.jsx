// pages/Dashboard/DashboardAddRecipe.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import { toast } from 'react-hot-toast';

const DashboardAddRecipe = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    const form = e.target;
    const recipe = {
      image: form.image.value,
      title: form.title.value,
      ingredients: form.ingredients.value,
      instructions: form.instructions.value,
      cuisineType: form.cuisineType.value,
      preparationTime: form.preparationTime.value,
      categories: Array.from(
        form.querySelectorAll('input[name=category]:checked')
      ).map((el) => el.value),
      likes: 0,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      createdAt: new Date(),
    };

    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const res = await fetch(`${BASE_URL}/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe),
      });

      if (res.ok) {
        toast.success('Recipe added successfully!');
        form.reset();
        navigate('/dashboard/my-recipes');
      } else {
        toast.error('Failed to add recipe');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error adding recipe');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-orange-500">Add a New Recipe</h2>
      <form onSubmit={handleAddRecipe} className="space-y-4 bg-white p-6 rounded shadow">
        <input name="image" type="url" placeholder="Image URL" className="input input-bordered w-full" required />
        <input name="title" type="text" placeholder="Title" className="input input-bordered w-full" required />
        <textarea name="ingredients" placeholder="Ingredients" className="textarea textarea-bordered w-full" required></textarea>
        <textarea name="instructions" placeholder="Instructions" className="textarea textarea-bordered w-full" required></textarea>

        <select name="cuisineType" className="select select-bordered w-full" required>
          <option value="">Select Cuisine Type</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
          <option value="Others">Others</option>
        </select>

        <input name="preparationTime" type="number" placeholder="Preparation Time (minutes)" className="input input-bordered w-full" required />

        <div className="grid grid-cols-2 text-red-500 gap-2">
          {['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Vegan'].map((cat) => (
            <label key={cat} className="flex items-center gap-2">
              <input type="checkbox" name="category" value={cat} className="checkbox" />
              <span>{cat}</span>
            </label>
          ))}
        </div>

        <button type="submit" className="btn btn-primary w-full">Add Recipe</button>
      </form>
    </div>
  );
};

export default DashboardAddRecipe;
