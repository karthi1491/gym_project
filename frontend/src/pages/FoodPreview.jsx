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

const FoodDetailView = ({ food, onBack }) => {
  const [isPaying, setIsPaying] = React.useState(false);

  const handlePayment = async () => {
    setIsPaying(true);
    try {
      // Calculate total amount from menu items
      const amount = food.menuItems.reduce((sum, item) => sum + item.price, 0);
      // Create order on backend
      const orderResponse = await axios.post('http://localhost:4000/user/payment/order', { amount });
      const { id: order_id, amount: order_amount, currency } = orderResponse.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Add your Razorpay key in .env
        amount: order_amount,
        currency: currency,
        name: food.restaurantName,
        description: "Payment for food order",
        order_id: order_id,
        handler: async function (response) {
          // Verify payment on backend
          try {
            const verifyResponse = await axios.post('http://localhost:4000/user/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            toast.success("Payment successful!");
          } catch (verifyError) {
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          email: "", // Optionally prefill user email
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Payment failed to initiate.");
      console.error(error);
    } finally {
      setIsPaying(false);
    }
  };

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
          src={food.restaurantImages?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"}
          alt="Food"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            {food.firstName}'s {food.restaurantName}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-medium">4.8</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <MapPin className="w-5 h-5" />
              <span>{food.location?.address || 'Location not available'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
        {/* Price Range & Delivery Time */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Details</h2>
          <p className="text-gray-700 mb-2">Price Range: {food.priceRange || 'N/A'}</p>
          <p className="text-gray-700 mb-2">Delivery Time: {food.deliveryTime ? `${food.deliveryTime} minutes` : 'N/A'}</p>
        </div>

        {/* Cuisine Types */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cuisine Types</h2>
          <ul className="list-disc list-inside">
            {food.cuisine && food.cuisine.length > 0 ? (
              food.cuisine.map((type, index) => <li key={index}>{type}</li>)
            ) : (
              <li>No cuisine types available</li>
            )}
          </ul>
        </div>

        {/* Menu Items */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Menu Items</h2>
          {food.menuItems && food.menuItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {food.menuItems.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 shadow-sm">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600">{item.category}</p>
                  <p className="text-gray-700 mt-2">{item.description}</p>
                  <p className="text-primary-500 font-bold mt-2">₹{item.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No menu items available</p>
          )}
        </div>

        {/* Food Images */}
        {food.restaurantImages?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Gallery</h2>
            <div className="grid grid-cols-2 gap-4">
              {food.restaurantImages.map((image, index) => (
                <div key={index} className="rounded-xl overflow-hidden aspect-video">
                  <img
                    src={image}
                    alt={`Food view ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
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
              <p className="text-gray-600">{food.location?.address}</p>
            </div>
            {food.location?.googleMapsLink && (
              <a
                href={food.location.googleMapsLink}
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
      <button 
        onClick={handlePayment} 
        disabled={isPaying}
        className="w-full bg-primary-500 text-white py-4 rounded-xl font-semibold hover:bg-primary-600 transition-colors"
      >
        {isPaying ? "Processing Payment..." : "Pay"}
      </button>
      </div>
    </div>
  );
};

const FoodPreview = () => {
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [allFoods, setAllFoods] = useState([]);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchAllFoods = async () => {
      try {
        const response = await axios.get('http://localhost:4000/food/all');
        setAllFoods(response.data.foods);
        if (!response.data.foods || response.data.foods.length === 0) {
          toast.info("No food providers found.");
        }
      } catch (error) {
        console.error('Error fetching foods:', error);
        toast.error("Failed to fetch food providers. Please try again later.");
      }
    };

    fetchAllFoods();
  }, []);

  // The rest of the component logic and UI can be copied and adapted from AdminPreview.jsx,
  // replacing gym-related terms with food-related terms.

  return (
    <div>
      {/* Implement similar UI and logic as AdminPreview.jsx */}
      <h1>Food Preview Page</h1>
    </div>
  );
};

export default FoodPreview;
