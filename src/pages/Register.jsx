import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-hot-toast';
import { updateProfile } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const { createUser, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = password => {
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const length = password.length >= 6;
    return uppercase && lowercase && length;
  };

  const handleRegister = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters and include uppercase and lowercase letters.');
      return;
    }

    createUser(email, password)
  .then(async (result) => {
    await updateProfile(result.user, {
      displayName: name,
      photoURL: photo,
    });
    toast.success('Registered successfully!');
    navigate('/');
  })
      .catch(err => {
        setError(err.message);
        toast.error('Registration failed');
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(() => {
        toast.success('Registered with Google!');
        navigate('/');
      })
      .catch(err => toast.error(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold text-center">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input name="name" type="text" placeholder="Name" className="input input-bordered w-full" required />
          <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
          <input name="photo" type="text" placeholder="Photo URL" className="input input-bordered w-full" required />
          <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />
          {error && <p className="text-red-500">{error}</p>}
          <button className="btn btn-primary w-full">Register</button>
        </form>
        <div className="text-center">
          <p>
            Already have an account? <Link to="/login" className="link">Login</Link>
          </p>
        </div>
        <button onClick={handleGoogleLogin} className="btn btn-outline w-full flex gap-2 items-center justify-center">
          <FcGoogle className="text-xl" /> Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
