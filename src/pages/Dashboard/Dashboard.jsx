import { Outlet, NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-orange-600 p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          <li><NavLink to="/dashboard" end>Overview</NavLink></li>
          <li><NavLink to="/dashboard/all-recipes">All Recipes</NavLink></li>
          <li><NavLink to="/dashboard/add-recipe">Add Recipe</NavLink></li>
          <li><NavLink to="/dashboard/my-recipes">My Recipes</NavLink></li>
        </ul>
      </aside>
      <main className="flex-1 p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
