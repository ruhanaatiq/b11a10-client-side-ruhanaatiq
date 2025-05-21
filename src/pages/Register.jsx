import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const { register, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must include at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must include at least one lowercase letter.";
    }
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      toast.error(passwordError);
      return;
    }

    try {
      const result = await register(email, password);
      await result.user.updateProfile({
        displayName: name,
        photoURL: photoURL,
      });
      toast.success('Registered successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await googleSignIn();
      toast.success('Logged in with Google!');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow">
        <h2 className="text-2xl text-red-500 font-semibold text-center">User Registration</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input name="name" type="text" placeholder="Full Name" className="input input-bordered w-full" required />
          <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
          <input name="photoURL" type="text" placeholder="Photo URL" className="input input-bordered w-full" required />
          <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="btn btn-primary w-full">Register</button>
        </form>
        <div className="text-center text-orange-500">
          <p>
            Already have an account? <Link to="/login" className="link">Login</Link>
          </p>
        </div>
        <button
          onClick={handleGoogleRegister}
          className="btn btn-outline w-full flex gap-2 items-center justify-center"
        >
          <FcGoogle className="text-xl" /> Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
