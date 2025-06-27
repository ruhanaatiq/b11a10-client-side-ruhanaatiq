import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

// Login Component
const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    setLoading(true);

    loginUser(email, password)
      .then(() => {
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Logged in with Google!");
        navigate(from, { replace: true });
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6">
      {/* Main Wrapper */}
      <div className="relative flex w-full max-w-screen-lg bg-white p-8 rounded-lg shadow-md">
        {/* Vector Image on the Left Side */}
        <div className="hidden lg:block w-1/2">
          <img
            src="https://i.ibb.co/MxJBVPv7/32318741-7922893.jpg" 
            alt="Recipe Image"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">
            Login to Recipe Book
          </h2>

          <form onSubmit={handleLogin} className="w-full max-w-sm">
            <div className="mb-4">
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className="input input-bordered w-full px-4 py-2 text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                className="input input-bordered w-full px-4 py-2 text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="btn bg-orange-600 text-white w-full py-2 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline bg-white border-orange-600 text-orange-600 w-full mt-3 py-2 rounded-lg flex justify-center items-center hover:bg-orange-100"
            >
              <FcGoogle className="w-6 h-6 mr-2" />
              Continue with Google
            </button>
          </div>

          <p className="mt-4 text-center text-orange-600  text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-orange-600 font-bold">
              Register
            </Link>
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
