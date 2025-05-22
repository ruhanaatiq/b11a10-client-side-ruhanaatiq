import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { FiLogOut } from "react-icons/fi";
import logo from "../assets/logo.png";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      setMenuOpen(false);
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
      console.error(err);
    }
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard accessibility for dropdown toggle
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setMenuOpen((open) => !open);
    }
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
        <NavLink
          to="/"
          className={({ isActive }) =>
            `btn btn-ghost text-base ${isActive ? "btn-primary" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/recipes"
          className={({ isActive }) =>
            `btn btn-ghost text-base ${isActive ? "btn-primary" : ""}`
          }
        >
          All Recipes
        </NavLink>
        {user && (
          <>
            <NavLink
              to="/add-recipe"
              className={({ isActive }) =>
                `btn btn-ghost text-base ${isActive ? "btn-primary" : ""}`
              }
            >
              Add Recipe
            </NavLink>
            <NavLink
              to="/my-recipes"
              className={({ isActive }) =>
                `btn btn-ghost text-base ${isActive ? "btn-primary" : ""}`
              }
            >
              My Recipes
            </NavLink>
          </>
        )}
      </div>

      {/* Auth Section */}
      <div className="flex-none gap-2" ref={dropdownRef}>
        {!user ? (
          <>
            <Link to="/login" className="btn btn-sm bg-blue-500 text-white">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm btn-outline">
              Register
            </Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setMenuOpen(!menuOpen)}
              onKeyDown={handleKeyDown}
              aria-expanded={menuOpen}
              aria-haspopup="true"
            >
              <div className="w-10 rounded-full">
               <img
  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar-placeholder.png"}
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
