import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [myRecipes, setMyRecipes] = useState(0);

  // Simulate fetching total recipes count and user's recipes count
  useEffect(() => {
    if (user) {
      // Fetch total recipes count
      fetch("/api/total-recipes")
        .then((res) => res.json())
        .then((data) => setTotalRecipes(data.totalRecipes))
        .catch((err) => toast.error("Error fetching total recipes"));

      // Fetch user's recipes count
      fetch(`/api/my-recipes?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setMyRecipes(data.myRecipes))
        .catch((err) => toast.error("Error fetching your recipes"));
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <div className="card shadow-lg p-4 bg-orange-400">
          <h3 className="text-xl font-semibold">Total Recipes</h3>
          <p className="text-3xl font-bold">{totalRecipes}</p>
        </div>
        <div className="card shadow-lg p-4 bg-orange-400">
          <h3 className="text-xl font-semibold">My Recipes</h3>
          <p className="text-3xl font-bold">{myRecipes}</p>
        </div>
      </div>

      {/* Links to other pages */}
      <div className="flex gap-4">
        <Link to="/recipes" className="btn btn-info">
          All Recipes
        </Link>
        <Link to="/add-recipe" className="btn btn-info">
          Add Recipe
        </Link>
        <Link to="/my-recipes" className="btn btn-info">
          My Recipes
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
