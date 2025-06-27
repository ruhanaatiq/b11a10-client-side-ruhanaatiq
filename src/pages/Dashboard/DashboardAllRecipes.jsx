import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashboardAllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${baseUrl}/recipes`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data);
      })
      .catch((err) => console.error("Failed to fetch recipes", err));
  }, [baseUrl]);

  const handleCategoryFilter = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (!category) {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(
        recipes.filter((recipe) =>
          recipe.categories?.includes(category)
        )
      );
    }
  };

  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    const sorted = [...filteredRecipes].sort((a, b) =>
      order === "asc"
        ? (a.likes || 0) - (b.likes || 0)
        : (b.likes || 0) - (a.likes || 0)
    );

    setFilteredRecipes(sorted);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-orange-500">All Recipes (Dashboard View)</h2>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div>
          <label className="mr-2">Category:</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryFilter}
            className="select select-bordered"
          >
            <option value="">All</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
            <option value="Vegan">Vegan</option>
          </select>
        </div>

        <div>
          <label className="mr-2">Sort by Likes:</label>
          <select
            value={sortOrder}
            onChange={handleSort}
            className="select select-bordered"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Table View */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="table w-full">
          <thead className="bg-gray-100 text-orange-600">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Prep Time</th>
              <th>Likes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecipes.map((recipe, index) => (
              <tr key={recipe._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={recipe.image || "https://via.placeholder.com/60"}
                    alt="recipe"
                    className="w-16 h-12 object-cover rounded"
                  />
                </td>
                <td className="text-yellow-500" >{recipe.title}</td>
                <td className="text-yellow-500">{recipe.Category}</td>
                <td className="text-yellow-500">{recipe.prepTime} mins</td>
                <td className="text-yellow-500">{recipe.likes || 0}</td>
                <td>
                  <Link to={`/recipes/${recipe._id}`} className="btn btn-sm bg-orange-600 text-white">
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {filteredRecipes.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No recipes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardAllRecipes;
