import React, { useState } from 'react';
import axios from 'axios';

const AdminRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    subscriptionPrices: {
      oneMonth: '',
      threeMonths: '',
      sixMonths: '',
      oneYear: '',
    },
    location: {
      address: '',
      coordinates: ['', ''],
      googleMapsLink: '',
    },
    gymImages: [],
    trainerImages: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('subscriptionPrices.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        subscriptionPrices: { ...prev.subscriptionPrices, [key]: value },
      }));
    } else if (name.includes('location.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e, type) => {
    setFormData({ ...formData, [type]: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('subscriptionPrices', JSON.stringify(formData.subscriptionPrices));
    data.append('location[address]', formData.location.address);
    data.append('location[coordinates][]', formData.location.coordinates[0]);
    data.append('location[coordinates][]', formData.location.coordinates[1]);
    data.append('location[googleMapsLink]', formData.location.googleMapsLink);

    Array.from(formData.gymImages).forEach((file) => {
      data.append('gymImages', file);
    });
    Array.from(formData.trainerImages).forEach((file) => {
      data.append('trainerImages', file);
    });

    try {
      const res = await axios.post('http://localhost:4000/admin/register', data);
      alert('Registered successfully!');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Register Your Gym</h2>

        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="firstName" placeholder="First Name" required value={formData.firstName} onChange={handleChange} className="input" />
          <input type="text" name="lastName" placeholder="Last Name" required value={formData.lastName} onChange={handleChange} className="input" />
        </div>

        <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} className="input" />
        <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} className="input" />

        {/* Subscription Prices */}
        <div>
          <label className="block font-semibold mb-2">Subscription Prices (₹)</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['oneMonth', 'threeMonths', 'sixMonths', 'oneYear'].map((key) => (
              <input
                key={key}
                type="number"
                name={`subscriptionPrices.${key}`}
                placeholder={key}
                required
                value={formData.subscriptionPrices[key]}
                onChange={handleChange}
                className="input"
              />
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block font-semibold mb-2">Location</label>
          <input type="text" name="location.address" placeholder="Address" required value={formData.location.address} onChange={handleChange} className="input mb-2" />
          <div className="flex gap-2">
            <input type="text" name="location.coordinates[0]" placeholder="Longitude" required value={formData.location.coordinates[0]} onChange={(e) => {
              const coords = [...formData.location.coordinates];
              coords[0] = e.target.value;
              setFormData({ ...formData, location: { ...formData.location, coordinates: coords } });
            }} className="input w-1/2" />
            <input type="text" name="location.coordinates[1]" placeholder="Latitude" required value={formData.location.coordinates[1]} onChange={(e) => {
              const coords = [...formData.location.coordinates];
              coords[1] = e.target.value;
              setFormData({ ...formData, location: { ...formData.location, coordinates: coords } });
            }} className="input w-1/2" />
          </div>
          <input type="text" name="location.googleMapsLink" placeholder="Google Maps Link" required value={formData.location.googleMapsLink} onChange={handleChange} className="input mt-2" />
        </div>

        {/* File Uploads */}
        <div>
          <label className="block font-semibold mb-1">Gym Images</label>
          <input type="file" multiple onChange={(e) => handleFileChange(e, 'gymImages')} className="input-file" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Trainer Images</label>
          <input type="file" multiple onChange={(e) => handleFileChange(e, 'trainerImages')} className="input-file" />
        </div>

        <button type="submit" className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition">
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminRegistration;
