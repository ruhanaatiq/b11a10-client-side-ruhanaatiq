import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import logo from "../assets/logo.png";
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
  };

  return (
    <div className="navbar bg-base-200 shadow-md px-4">
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
        <NavLink to="/" className="btn btn-ghost text-base">Home</NavLink>
        <NavLink to="/recipes" className="btn btn-ghost text-base">All Recipes</NavLink>
        {user && (
          <>
            <NavLink to="/add-recipe" className="btn btn-ghost text-base">Add Recipe</NavLink>
            <NavLink to="/my-recipes" className="btn btn-ghost text-base">My Recipes</NavLink>
          </>
        )}
      </div>

      {/* Auth Section */}
      <div className="flex-none gap-2">
        {!user ? (
          <>
            <Link to="/login" className="btn btn-sm bg-blue-500 text-white">Login</Link>
            <Link to="/register" className="btn btn-sm btn-outline">Register</Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL || "https://i.postimg.cc/cLxLKGfH/images.png"}
                  alt="user avatar"
                />
              </div>
            </div>
            {menuOpen && (
              <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-48 z-50">
                <li className="font-semibold text-gray-700">{user.displayName || "User"}</li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-red-500 hover:text-red-700"
                  >
                    <FiLogOut className="mr-2" /> Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
