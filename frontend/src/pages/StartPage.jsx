import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dumbbell, 
  Flower2,
  Music, 
  UtensilsCrossed, 
  ShoppingBag, 
  Coffee, 
  Ticket
} from 'lucide-react';

const StartPage = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: 'Gym',
      icon: <Dumbbell className="w-12 h-12 mb-4 text-primary-500" />,
      description: 'Find the best gyms near you',
      route: '/adminpreview',
      bgColor: 'bg-red-50'
    },
    {
      id: 2,
      name: 'Yoga',
      icon: <Flower2 className="w-12 h-12 mb-4 text-purple-500" />,
      description: 'Discover yoga studios & classes',
      route: '/yoga',
      bgColor: 'bg-purple-50'
    },
    {
      id: 3,
      name: 'Dance',
      icon: <Music className="w-12 h-12 mb-4 text-blue-500" />,
      description: 'Join dance classes & academies',
      route: '/dance',
      bgColor: 'bg-blue-50'
    },
    {
      id: 4,
      name: 'Food Delivery',
      icon: <UtensilsCrossed className="w-12 h-12 mb-4 text-orange-500" />,
      description: 'Order food from your favorite restaurants',
      route: '/food-delivery',
      bgColor: 'bg-orange-50'
    },
 

 
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">KAOB</h1>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Log in
              </button>
              <button 
                onClick={() => navigate('/category-select')}
                className="bg-primary-500 text-white px-6 py-3 rounded-xl hover:bg-primary-600 transition-colors"
              >
                Register Your Business
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">What are you looking for?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate(category.route)}
              className={`${category.bgColor} p-6 rounded-xl cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="flex flex-col items-center text-center">
                {category.icon}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Premium Gyms</h3>
              <p className="mb-6">Get access to exclusive premium gyms in your area</p>
              <button className="bg-white text-purple-500 px-6 py-2 rounded-lg font-medium hover:bg-gray-100">
                Explore Now
              </button>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Yoga Retreats</h3>
              <p className="mb-6">Join exclusive yoga retreats and workshops</p>
              <button className="bg-white text-orange-500 px-6 py-2 rounded-lg font-medium hover:bg-gray-100">
                Learn More
              </button>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Dance Workshops</h3>
              <p className="mb-6">Learn from professional dance instructors</p>
              <button className="bg-white text-green-500 px-6 py-2 rounded-lg font-medium hover:bg-gray-100">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage; 