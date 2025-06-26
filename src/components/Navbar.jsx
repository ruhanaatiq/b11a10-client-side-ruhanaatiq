import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { FiLogOut } from "react-icons/fi";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => toast.success("Logged out successfully!"))
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="navbar bg-white shadow-md px-4 sticky top-0 z-50">
      {/* Logo/Title */}
      <div className="flex-1 flex items-center gap-2">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 w-10" />
        </Link>
        <Link to="/" className="btn btn-ghost text-xl text-orange-600 font-bold">
          Recipe Book
        </Link>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex gap-2 items-center">
         <NavLink 
          to="/" 
          className={({ isActive }) => `btn btn-ghost text-orange-500 ${isActive ? "btn-primary" : ""}`}
        >
          Home
        </NavLink>
        <NavLink to="/recipes" className={({ isActive }) => `btn btn-ghost text-orange-500 ${isActive ? "btn-primary" : ""}`}>
          All Recipes
        </NavLink>
        {user && (
          <>
            <NavLink to="/add-recipe" className={({ isActive }) => `btn btn-ghost text-orange-500 ${isActive ? "btn-primary" : ""}`}>
              Add Recipe
            </NavLink>
            <NavLink to="/my-recipes" className={({ isActive }) => `btn btn-ghost text-orange-500 ${isActive ? "btn-primary" : ""}`}>
              My Recipes
            </NavLink>
          </>
        )}
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <img src={user.photoURL} alt="User" className="w-9 h-9 rounded-full border" />
            <button onClick={handleLogout} className="btn btn-sm btn-outline text-orange-500">
              <FiLogOut /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-sm btn-outline btn-info">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm btn-info">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
