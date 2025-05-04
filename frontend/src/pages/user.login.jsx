import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

function userlogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Login data object
    const loginData = { email, password };

    // Check if geolocation is available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // If geolocation is available, add latitude and longitude to login data
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Add location data to login request
          loginData.latitude = latitude;
          loginData.longitude = longitude;

          // Call the function to perform login
          await performLogin(loginData);
        },
        async (error) => {
          // If geolocation is not available or fails, proceed without location
          await performLogin(loginData);
        }
      );
    } else {
      // If geolocation is not supported, proceed with login without location
      await performLogin(loginData);
    }
  };

  // Function to perform the actual login API call
  const performLogin = async (loginData) => {
    try {
      const res = await axios.post('http://localhost:4000/user/login', loginData);
      console.log(res.data);

      // Store token and other data in localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('nearbyGyms', JSON.stringify(res.data.nearbyGyms));
      localStorage.setItem('nearbyYoga', JSON.stringify(res.data.nearbyYoga));
      localStorage.setItem('nearbyDance', JSON.stringify(res.data.nearbyDance));
      localStorage.setItem('nearbyFood', JSON.stringify(res.data.nearbyFood));

      // Navigate to the start page
      navigate('/start');
    } catch (err) {
      console.error(err); // Log the error for debugging
      alert(err.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      {/* Background Image */}
      <img
        src="https://sdmntpreastus2.oaiusercontent.com/files/00000000-8e70-61f6-a4c8-a1bb8d9befcf/raw?se=2025-04-13T06%3A45%3A41Z&sp=r&sv=2024-08-04&sr=b&scid=291e74ed-0b6e-5dc7-971e-96e01a550635&skoid=b53ae837-f585-4db7-b46f-2d0322fce5a9&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-13T04%3A28%3A47Z&ske=2025-04-14T04%3A28%3A47Z&sks=b&skv=2024-08-04&sig=iUEYUxj8sNHdk6OEIFQeZrA2BwKhlDZO4i2YhsbZ1JM%3D"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="w-full max-w-sm bg-black text-white p-6 rounded-2xl relative">
        {/* Uber-style loader */}
        {loading && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 rounded-2xl">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl font-semibold mb-6">Welcome back</h1>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 bg-[#1c1c1e] text-white rounded-md border border-[#2c2c2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full px-4 py-3 pr-10 bg-[#1c1c1e] text-white rounded-md border border-[#2c2c2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-md hover:bg-gray-200 transition"
          >
            Login
          </button>

          {/* 🚀 Login as Owner Button */}
        </form>

        {/* Footer Links */}
        <div className="mt-8 text-sm text-center text-gray-400">
          <p>
            Don't have an account?{' '}
            <Link to="/userregistration" className="text-white underline">
              Register
            </Link>
          </p>
          <p className="mt-2">
            Forgot password?{' '}
            <a href="/forgot-password" className="text-white underline">
              Reset Password
            </a>
          </p>
        </div>

        <Link
          to="/category-select"
          className="w-full inline-block text-center bg-white text-black font-semibold mt-60 py-3 rounded-md hover:bg-gray-200 transition"
        >
          Register as Owner
        </Link>
      </div>
    </div>
  );
}

export default userlogin;
