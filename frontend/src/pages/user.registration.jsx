import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function UserRegistration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        console.log(formData);
      const res = await axios.post('http://localhost:4000/user/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/adminpreview');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4 relative">
      <img src="https://images.unsplash.com/photo-1589395595558-7bfa0b33ef1d" alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-30" />

      <div className="w-full max-w-md bg-black bg-opacity-80 text-white p-6 rounded-2xl relative z-10">
        {loading && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-2xl z-20">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <h1 className="text-3xl font-semibold mb-6 text-center">Create an account</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#1c1c1e] text-white rounded-md border border-[#2c2c2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#1c1c1e] text-white rounded-md border border-[#2c2c2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#1c1c1e] text-white rounded-md border border-[#2c2c2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-10 bg-[#1c1c1e] text-white rounded-md border border-[#2c2c2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button type="button" onClick={togglePassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-md hover:bg-gray-200 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account? <a href="/" className="text-white underline">Login</a>
        </p>
      </div>
    </div>
  );
}

export default UserRegistration;
