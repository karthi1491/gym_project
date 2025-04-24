import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    restaurantName: '',
    cuisine: [],
    priceRange: '',
    deliveryTime: '',
    location: {
      address: '',
      coordinates: ['', ''],
      googleMapsLink: ''
    },
    menuItems: [],
    restaurantImages: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting restaurantName:', formData.restaurantName);
    const data = new FormData();
    
    Object.keys(formData).forEach(key => {
      if (key !== 'restaurantImages' && key !== 'location') {
        if (typeof formData[key] === 'object' && !Array.isArray(formData[key])) {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      }
    });

    data.append('location', JSON.stringify(formData.location));

    formData.restaurantImages.forEach(file => {
      data.append('restaurantImages', file);
    });

    try {
      const res = await axios.post('http://localhost:4000/food/register', data);
      alert('Registration successful!');
      navigate('/start');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Register Your Restaurant</h1>
        
        {/* Personal Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="First Name"
            className="p-3 border rounded"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="p-3 border rounded"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 border rounded"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 border rounded"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>

        {/* Restaurant Info */}
        <input
          type="text"
          placeholder="Restaurant Name"
          className="w-full p-3 border rounded mb-4"
          value={formData.restaurantName}
          onChange={(e) => setFormData({...formData, restaurantName: e.target.value})}
        />

        {/* Cuisine Types */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Cuisine Types</h3>
          <input
            type="text"
            placeholder="Enter cuisine types (comma separated)"
            className="w-full p-3 border rounded"
            onChange={(e) => setFormData({
              ...formData,
              cuisine: e.target.value.split(',').map(type => type.trim())
            })}
          />
        </div>

        {/* Price Range & Delivery Time */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            <select
              className="w-full p-3 border rounded"
              value={formData.priceRange}
              onChange={(e) => setFormData({...formData, priceRange: e.target.value})}
            >
              <option value="">Select Price Range</option>
              <option value="$">$ (Budget)</option>
              <option value="$$">$$ (Moderate)</option>
              <option value="$$$">$$$ (Expensive)</option>
            </select>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Delivery Time (minutes)</h3>
            <input
              type="number"
              className="w-full p-3 border rounded"
              value={formData.deliveryTime}
              onChange={(e) => setFormData({...formData, deliveryTime: e.target.value})}
            />
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Location</h3>
          <input
            type="text"
            placeholder="Address"
            className="w-full p-3 border rounded mb-2"
            value={formData.location.address}
            onChange={(e) => setFormData({
              ...formData,
              location: {...formData.location, address: e.target.value}
            })}
          />
          <input
            type="text"
            placeholder="Google Maps Link"
            className="w-full p-3 border rounded"
            value={formData.location.googleMapsLink}
            onChange={(e) => setFormData({
              ...formData,
              location: {...formData.location, googleMapsLink: e.target.value}
            })}
          />
        </div>

        {/* Images */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Restaurant Images</h3>
          <input
            type="file"
            multiple
            onChange={(e) => setFormData({
              ...formData,
              restaurantImages: Array.from(e.target.files)
            })}
        className="w-full"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600"
      required
    >
      Register Restaurant
    </button>
  </form>
</div>
  );
};

export default FoodRegistration; 