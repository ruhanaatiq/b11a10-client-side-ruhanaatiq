import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort: ascending
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetch recipes from the API
  useEffect(() => {
    fetch(`${baseUrl}/recipes`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data); // Initially show all recipes
      })
      .catch((err) => console.error("Failed to fetch recipes", err));
  }, [baseUrl]);

  // Filter recipes by category
  const handleCategoryFilter = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === "") {
      setFilteredRecipes(recipes); // Show all recipes if no category selected
    } else {
      setFilteredRecipes(
        recipes.filter((recipe) => recipe.Category === category) // Filter by category
      );
    }
  };

  // Sort recipes by likes (ascending or descending)
  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    const sortedRecipes = [...filteredRecipes].sort((a, b) => {
      const likesA = parseInt(a.likes, 10);
      const likesB = parseInt(b.likes, 10);

      return order === "asc" ? likesA - likesB : likesB - likesA;
    });

    setFilteredRecipes(sortedRecipes);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">All Recipes</h2>

      {/* Filters */}
      <div className="mb-6 flex justify-between items-center">
        {/* Category Filter */}
        <div>
          <label htmlFor="Category" className="mr-2">Filter by Category:</label>
          <select
            id="Category"
            value={selectedCategory}
            onChange={handleCategoryFilter}
            className="select select-bordered"
          >
            <option value="">All Categories</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snacks">Snacks</option>
            <option value="breakfast">Breakfast</option>
          </select>
        </div>

        {/* Sort by Likes */}
        <div>
          <label htmlFor="sortOrder" className="mr-2">Sort by Likes:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={handleSort}
            className="select select-bordered"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
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
              <p className="text-sm">Prep Time: {recipe.prepTime} mins</p>
              <p><strong>Category:</strong> {recipe.Category}</p> {/* Display the category */}
              <p className="text-sm">Likes: {recipe.likes || 0}</p>
              <Link to={`/recipes/${recipe._id}`} className="btn bg-orange-600 btn-sm mt-2">
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
