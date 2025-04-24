import React, { useState, useEffect } from "react";
import { useAdmin } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, Star, ChevronRight, ArrowLeft, 
  Search, Calendar, Filter, X, TrendingUp,
  Navigation, Clock, DollarSign, Dumbbell, Menu, LogOut, User, Settings, HelpCircle, Info
} from 'lucide-react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GymDetailView = ({ gym, onBack }) => {
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
          src={gym.gymImages?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"}
          alt="Gym"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            {gym.firstName}'s Fitness Hub
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-medium">4.8</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <MapPin className="w-5 h-5" />
              <span>{gym.location?.address || 'Location not available'}</span>
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
            {Object.entries(gym.subscriptionPrices || {}).map(([period, price]) => (
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

        {/* Gym Images */}
        {gym.gymImages?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Gallery</h2>
            <div className="grid grid-cols-2 gap-4">
              {gym.gymImages.map((image, index) => (
                <div key={index} className="rounded-xl overflow-hidden aspect-video">
                  <img
                    src={image}
                    alt={`Gym view ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trainers Section - Enhanced */}
        {gym.trainerImages?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Expert Trainers</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gym.trainerImages.map((image, index) => (
                <div 
                  key={index} 
                  className="group relative rounded-xl overflow-hidden aspect-square shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={image || "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb"}
                    alt={`Trainer ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="font-semibold">Trainer {index + 1}</p>
                      <p className="text-sm text-gray-200">Fitness Expert</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary-500">{gym.trainerImages.length}</p>
                <p className="text-sm text-gray-600">Expert Trainers</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary-500">5+</p>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary-500">100+</p>
                <p className="text-sm text-gray-600">Happy Clients</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary-500">4.8</p>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
            </div>
          </div>
        )}

        {/* Location */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-primary-500" />
              <p className="text-gray-600">{gym.location?.address}</p>
            </div>
            {gym.location?.googleMapsLink && (
              <a
                href={gym.location.googleMapsLink}
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
      </div>
    </div>
  );
};

const AdminPreview = () => {
  const { admin, loading } = useAdmin();
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Wrap setSearchQuery to add toast on clear
  const handleSearchQueryChange = (value) => {
    if (value === "") {
      toast.info("Search cleared.");
    }
    setSearchQuery(value);
  };
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedGym, setSelectedGym] = useState(null);
  const [allGyms, setAllGyms] = useState([]);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchAllGyms = async () => {
      try {
        const response = await axios.get('http://localhost:4000/admin/all');
        setAllGyms(response.data.admins);
        if (!response.data.admins || response.data.admins.length === 0) {
          toast.info("No gyms found.");
        }
      } catch (error) {
        console.error('Error fetching gyms:', error);
        toast.error("Failed to fetch gyms. Please try again later.");
      }
    };

    fetchAllGyms();
  }, []);

  const popularLocations = [
    { id: 1, name: "Mumbai", area: "Maharashtra", count: "256 gyms" },
    { id: 2, name: "Delhi", area: "New Delhi", count: "189 gyms" },
    { id: 3, name: "Bangalore", area: "Karnataka", count: "145 gyms" },
    { id: 4, name: "Hyderabad", area: "Telangana", count: "98 gyms" },
  ];

  const trendingSearches = [
    { text: "Crossfit Gyms", count: "50+ searches" },
    { text: "Yoga Studios", count: "30+ searches" },
    { text: "24/7 Gyms", count: "25+ searches" },
    { text: "Personal Training", count: "20+ searches" },
  ];

  const SearchBar = () => (
    <div className="relative z-50">
      {/* Fixed Header */}
      <div className="fixed inset-x-0 top-0 bg-white shadow-md">
        {/* Brand Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-4">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-extrabold text-white" style={{ letterSpacing: '0.1em' }}>
                KAOB
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-1.5 text-sm font-medium text-primary-500 bg-white rounded-full hover:bg-gray-100 transition-colors">
                Login
              </button>
              <button className="px-4 py-1.5 text-sm font-medium text-white border border-white rounded-full hover:bg-primary-600 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Search Input - Added more padding and refined design */}
        <div className="px-6 py-4 border-b border-gray-100 bg-white">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for gyms in your area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchOverlay(true)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  toast.info("Search cleared.");
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills - Improved spacing and scrolling */}
        <div className="px-6 py-3 flex gap-3 m-2 overflow-x-auto hide-scrollbar bg-white">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors whitespace-nowrap">
            <Filter className="w-4 h-4" />
            All Filters
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors whitespace-nowrap">
            <Calendar className="w-4 h-4" />
            Date
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors whitespace-nowrap">
            <DollarSign className="w-4 h-4" />
            Price Range
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors whitespace-nowrap">
            <Clock className="w-4 h-4" />
            Timing
          </button>
        </div>
      </div>

      {/* Search Overlay with better spacing */}
      {showSearchOverlay && (
        <div className="fixed inset-0 bg-white z-40 mb-10 animate-fade-in" style={{ top: '168px' }}>
          <div className="p-6 space-y-8">
            {/* Near Me Option */}
            <div className="group">
              <button className="flex items-center gap-4 w-full p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="p-2.5 bg-primary-50 rounded-full group-hover:bg-primary-100 transition-colors">
                  <Navigation className="w-5 h-5 text-primary-500" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Near me</p>
                  <p className="text-sm text-gray-500">Use current location</p>
                </div>
              </button>
            </div>

            {/* Popular Locations */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-gray-500 px-1">POPULAR LOCATIONS</h3>
              <div className="space-y-2">
                {popularLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => {
                      setSelectedLocation(location);
                      setShowSearchOverlay(false);
                    }}
                    className="flex items-center gap-4 w-full p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-900">{location.name}</p>
                      <p className="text-sm text-gray-500">{location.area}</p>
                    </div>
                    <span className="text-xs text-gray-400">{location.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const handleLogout = () => {
    updateAdmin(null);
    toast.success("Logged out successfully.");
    navigate('/adminlogin');
  };

  // Add toast on gym selection
  const handleGymSelect = (gym) => {
    setSelectedGym(gym);
    toast.info(`Selected gym: ${gym.firstName}'s Fitness Hub`);
  };

  // Gym Card Component
  const GymCard = ({ gym }) => (
    <div 
      onClick={() => handleGymSelect(gym)}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
    >
      {/* Image with better error handling */}
      <div className="relative h-56 overflow-hidden  bg-gray-100">
        <img
          src={gym.gymImages?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"}
          alt="Gym"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48";
          }}
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-semibold">4.8</span>
        </div>
      </div>

      {/* Content with improved spacing */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {gym.firstName}'s Fitness Hub
        </h3>
        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <MapPin className="w-4 h-4 text-primary-500 flex-shrink-0" />
          <p className="text-sm truncate">{gym.location?.address || 'Location not available'}</p>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500 mb-1">Starting from</p>
            <div className="space-y-1">
              <p className="text-lg font-bold text-primary-500">
                ₹{gym.subscriptionPrices?.oneDay || '0'}/day
              </p>
              <p className="text-sm text-gray-500">
                ₹{gym.subscriptionPrices?.oneMonth || '0'}/mo
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
        </div>
      </div>
    </div>
  );

  const MenuOverlay = () => (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={() => setIsMenuOpen(false)}
    >
      <div 
        className={`fixed top-0 left-0 w-80 h-full bg-white transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-red-500 text-white p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Hello, {admin?.firstName || 'User'}</h2>
            <p className="text-sm opacity-90">{admin?.email}</p>
          </div>
          <button onClick={() => setIsMenuOpen(false)} className="p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <button className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-100">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">My Profile</span>
          </button>
          
          <button className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-100">
            <Settings className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Settings</span>
          </button>
          
          <button className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-100">
            <HelpCircle className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Help & Support</span>
          </button>
          
          <button className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-100">
            <Info className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">About Us</span>
          </button>
          
          <button 
            onClick={handleLogout}
            className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-100 text-red-500"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="relative">
          <Dumbbell className="w-10 h-10 text-primary-500 animate-bounce" />
          <div className="absolute inset-0 w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (selectedGym) {
    return <GymDetailView gym={selectedGym} onBack={() => setSelectedGym(null)} />;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Fixed Header with Hamburger */}
      <div className="fixed inset-x-0 top-0 bg-black shadow-sm z-50">
        {/* Brand Header with Hamburger */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-500 px-4 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="p-2 hover:bg-primary-600 rounded-full bg-primary-700 border-2 border-white shadow-lg"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 text-white" />
              </button>
              <h1 className="text-3xl font-extrabold text-white" style={{ letterSpacing: '0.1em' }}>
                KAOB
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-1.5 text-sm font-medium text-primary-500 bg-white rounded-full hover:bg-gray-100 transition-colors">
                Login
              </button>
              <button className="px-4 py-1.5 text-sm font-medium text-white border border-white rounded-full hover:bg-primary-600 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="px-6 py-4 border-b border-gray-100 bg-black">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for gyms in your area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchOverlay(true)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Menu Overlay */}
      <MenuOverlay />
      <ToastContainer />

      <div className="pt-[180px] pb-20">
        {!showSearchOverlay && (
          <div className="max-w-7xl mx-auto px-6 mt-6">
            {selectedLocation && (
              <div className="bg-white px-6 py-4 shadow-sm rounded-xl mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary-500" />
                  <div>
                    <h2 className="font-medium text-gray-900">{selectedLocation.name}</h2>
                    <p className="text-sm text-gray-500">{selectedLocation.area}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Gym Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allGyms.length > 0 ? (
                allGyms.map((gym) => (
                  <GymCard key={gym._id} gym={gym} />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <Dumbbell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No gyms found in this area</p>
                  <button 
                    onClick={() => {
                      toast.info("Redirecting to gym registration.");
                      navigate('/adminregistration');
                    }}
                    className="bg-primary-500 text-white px-6 py-3 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Register Your Gym
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPreview;
