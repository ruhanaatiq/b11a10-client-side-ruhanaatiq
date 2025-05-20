import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      toast.success('Logged in successfully!');
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error('Login failed');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      toast.success('Logged in with Google!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow">
        <h2 className="text-2xl text-red-500 font-semibold text-center">User Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="text-right">
            <Link to="#" className="text-sm text-orange-500 link">Forgot Password?</Link>
          </div>
          <button className="btn btn-primary w-full">Login</button>
        </form>
        <div className="text-center text-orange-500">
          <p >
            New here? <Link to="/register" className="link">Register</Link>
          </p>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex gap-2 items-center justify-center"
        >
          <FcGoogle className="text-xl " /> Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
