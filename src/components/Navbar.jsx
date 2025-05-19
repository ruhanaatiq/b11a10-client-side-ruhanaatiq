import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
  };

  const navLinks = (
    <>
      <NavLink to="/" className="mx-2">Home</NavLink>
      <NavLink to="/recipes" className="mx-2">All Recipes</NavLink>
      {user && (
        <>
          <NavLink to="/add-recipe" className="mx-2">Add Recipe</NavLink>
          <NavLink to="/my-recipes" className="mx-2">My Recipes</NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-orange-600">Recipe Book</Link>
      
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex">{navLinks}</div>

        {!user ? (
          <>
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
            <Link to="/register" className="btn btn-outline btn-sm">Register</Link>
          </>
        ) : (
          <div className="relative">
            <img
              src={user.photoURL}
              alt="avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-lg p-3 z-50">
                <p className="font-semibold text-gray-700 mb-2">{user.displayName}</p>
                <button
                  className="flex items-center text-red-500 hover:underline"
                  onClick={handleLogout}
                >
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
