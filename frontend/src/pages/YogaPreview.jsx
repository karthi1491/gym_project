import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, Star, ChevronRight, ArrowLeft, 
  Search, Calendar, Filter, X, TrendingUp,
  Navigation, Clock, DollarSign, Dumbbell, Menu, LogOut, User, Settings, HelpCircle, Info
} from 'lucide-react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const YogaDetailView = ({ yoga, onBack }) => {
  return (
    <div className="min-h-screen bg-white animate-fade-in">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
      >
        <ArrowLeft className="w-6 h-6 text-gray-700" />
      </button>

      {/* Hero Image Section */}
      <div className="relative h-[300px]">
        <img
          src={yoga.yogaImages?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"}
          alt="Yoga"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            {yoga.firstName}'s Yoga Studio
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-medium">4.8</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <MapPin className="w-5 h-5" />
              <span>{yoga.location?.address || 'Location not available'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
        {/* Membership Plans */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Membership Plans</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(yoga.subscriptionPrices || {}).map(([period, price]) => (
              <div 
                key={period}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <p className="text-gray-600 mb-2">
                  {period === 'oneDay' ? '1 Day' :
                   period === 'oneMonth' ? '1 Month' :
                   period === 'threeMonths' ? '3 Months' :
                   period === 'sixMonths' ? '6 Months' : '1 Year'}
                </p>
                <p className="text-3xl font-bold text-primary-500">₹{price}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {period === 'oneDay' ? 'Per day' : 'Per month'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Yoga Images */}
        {yoga.yogaImages?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Gallery</h2>
            <div className="grid grid-cols-2 gap-4">
              {yoga.yogaImages.map((image, index) => (
                <div key={index} className="rounded-xl overflow-hidden aspect-video">
                  <img
                    src={image}
                    alt={`Yoga view ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trainers Section */}
        {yoga.instructorImages?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Expert Instructors</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {yoga.instructorImages.map((image, index) => (
                <div 
                  key={index} 
                  className="group relative rounded-xl overflow-hidden aspect-square shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={image || "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb"}
                    alt={`Instructor ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="font-semibold">Instructor {index + 1}</p>
                      <p className="text-sm text-gray-200">Yoga Expert</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Location */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-primary-500" />
              <p className="text-gray-600">{yoga.location?.address}</p>
            </div>
            {yoga.location?.googleMapsLink && (
              <a
                href={yoga.location.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600"
              >
                View on Google Maps
                <ChevronRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Join Now Button */}
        <button className="w-full bg-primary-500 text-white py-4 rounded-xl font-semibold hover:bg-primary-600 transition-colors">
          Join Now
        </button>
        {/* Pay Button like OYO */}
        <button className="w-full mt-4 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors">
          Pay Now
        </button>
      </div>
    </div>
  );
};

const YogaPreview = () => {
  const [yoga, setYoga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedYoga, setSelectedYoga] = useState(null);
  const [allYogas, setAllYogas] = useState([]);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchAllYogas = async () => {
      try {
        const response = await axios.get('http://localhost:4000/yoga/all');
        setAllYogas(response.data.yogas);
        if (!response.data.yogas || response.data.yogas.length === 0) {
          toast.info("No yoga studios found.");
        }
      } catch (error) {
        console.error('Error fetching yogas:', error);
        toast.error("Failed to fetch yoga studios. Please try again later.");
      }
    };

    fetchAllYogas();
  }, []);

  // The rest of the component logic and UI can be copied and adapted from AdminPreview.jsx,
  // replacing gym-related terms with yoga-related terms.

  return (
    <div>
      {/* Implement similar UI and logic as AdminPreview.jsx */}
      <h1>Yoga Preview Page</h1>
    </div>
  );
};

export default YogaPreview;
