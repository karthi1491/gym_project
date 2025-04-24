import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DanceRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    academyName: '',
    danceStyles: [],
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
    academyImages: [],
    instructorImages: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    Object.keys(formData).forEach(key => {
      if (key !== 'academyImages' && key !== 'instructorImages' && key !== 'subscriptionPrices' && key !== 'location') {
        data.append(key, formData[key]);
      }
    });

    data.append('subscriptionPrices', JSON.stringify(formData.subscriptionPrices));
    data.append('location', JSON.stringify(formData.location));

    formData.academyImages.forEach(file => {
      data.append('academyImages', file);
    });
    formData.instructorImages.forEach(file => {
      data.append('instructorImages', file);
    });

    try {
      const res = await axios.post('http://localhost:4000/dance/register', data);
      alert('Registration successful!');
      navigate('/adminpreview');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Register Your Dance Academy</h1>
        
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

        {/* Academy Info */}
        <input
          type="text"
          placeholder="Academy Name"
          className="w-full p-3 border rounded mb-4"
          value={formData.academyName}
          onChange={(e) => setFormData({...formData, academyName: e.target.value})}
        />

        {/* Dance Styles */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Dance Styles</h3>
          <input
            type="text"
            placeholder="Enter dance styles (comma separated)"
            className="w-full p-3 border rounded"
            onChange={(e) => setFormData({
              ...formData,
              danceStyles: e.target.value.split(',').map(style => style.trim())
            })}
          />
        </div>

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
          <h3 className="font-semibold mb-2">Images</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Academy Images</label>
              <input
                type="file"
                multiple
                onChange={(e) => setFormData({
                  ...formData,
                  academyImages: Array.from(e.target.files)
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
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
        >
          Register Academy
        </button>
      </form>
    </div>
  );
};

export default DanceRegistration; 