import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';


const YogaRegistration = () => {
  const navigate = useNavigate();
  const { updateAdmin } = useAdmin();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    studioName: '',
    yogaStyles: [],
    subscriptionPrices: {
      oneDay: '',
      oneMonth: '',
      threeMonths: '',
      sixMonths: '',
      oneYear: ''
    },
    location: {
      address: '',
      coordinates: ['', ''],
      googleMapsLink: ''
    },
    studioImages: [],
    instructorImages: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    // Append form data
    Object.keys(formData).forEach(key => {
      if (key !== 'studioImages' && key !== 'instructorImages' && key !== 'subscriptionPrices' && key !== 'location' && key !== 'yogaStyles') {
        data.append(key, formData[key]);
      }
    });

    // Convert subscriptionPrices values to numbers or 0 if empty
    const subscriptionPrices = {};
    Object.entries(formData.subscriptionPrices).forEach(([key, value]) => {
      subscriptionPrices[key] = value === '' ? 0 : Number(value);
    });

    // Convert coordinates strings to numbers
    const coordinates = Array.isArray(formData.location.coordinates) && formData.location.coordinates.length === 2
      ? formData.location.coordinates.map(coord => Number(coord))
      : [0, 0];

    const locationWithCoords = {
      ...formData.location,
      coordinates: coordinates
    };

    data.append('yogaStyles', JSON.stringify(formData.yogaStyles));
    data.append('subscriptionPrices', JSON.stringify(subscriptionPrices));
    data.append('location', JSON.stringify(locationWithCoords));

    // Append images
    formData.studioImages.forEach(file => {
      data.append('studioImages', file);
    });
    formData.instructorImages.forEach(file => {
      data.append('instructorImages', file);
    });

    try {
      const res = await axios.post('http://localhost:4000/yoga/register', data);
      alert('Registration successful!');
      updateAdmin(res.data);
      navigate('/adminpreview');
    } catch (err) {
      console.error('Registration error:', err);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Register Your Yoga Studio</h1>
        
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
            minLength={3}
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

        {/* Studio Info */}
        <input
          type="text"
          placeholder="Studio Name"
          className="w-full p-3 border rounded mb-4"
          value={formData.studioName}
          onChange={(e) => setFormData({...formData, studioName: e.target.value})}
          required
        />
        {/* Yoga Styles */}
        <input
          type="text"
          placeholder="Yoga Styles (comma separated)"
          className="w-full p-3 border rounded mb-4"
          value={formData.yogaStyles.join(', ')}
          onChange={(e) => setFormData({...formData, yogaStyles: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
          required
        />

        {/* Subscription Prices */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Subscription Prices</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.keys(formData.subscriptionPrices).map((period) => (
              <input
                key={period}
                type="number"
                placeholder={period}
                className="p-3 border rounded"
                value={formData.subscriptionPrices[period]}
                onChange={(e) => setFormData({
                  ...formData,
                  subscriptionPrices: {
                    ...formData.subscriptionPrices,
                    [period]: e.target.value
                  }
                })}
                required
              />
            ))}
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
            required
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
            required
          />
        </div>

        {/* Images */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Images</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Studio Images</label>
              <input
                type="file"
                multiple
                onChange={(e) => setFormData({
                  ...formData,
                  studioImages: Array.from(e.target.files)
                })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block mb-2">Instructor Images</label>
              <input
                type="file"
                multiple
                onChange={(e) => setFormData({
                  ...formData,
                  instructorImages: Array.from(e.target.files)
                })}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600"
        >
          Register Studio
        </button>
      </form>
    </div>
  );
};

export default YogaRegistration; 