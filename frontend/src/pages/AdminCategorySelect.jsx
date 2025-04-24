import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dumbbell, 
  Flower2,
  Music, 
  UtensilsCrossed
} from 'lucide-react';

const AdminCategorySelect = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: 'Gym',
      icon: <Dumbbell className="w-12 h-12 mb-4 text-primary-500" />,
      route: '/adminregistration',
      bgColor: 'bg-red-50'
    },
    {
      id: 2,
      name: 'Yoga',
      icon: <Flower2 className="w-12 h-12 mb-4 text-purple-500" />,
      route: '/yoga-registration',
      bgColor: 'bg-purple-50'
    },
    {
      id: 3,
      name: 'Dance',
      icon: <Music className="w-12 h-12 mb-4 text-blue-500" />,
      route: '/dance-registration',
      bgColor: 'bg-blue-50'
    },
    {
      id: 4,
      name: 'Food Delivery',
      icon: <UtensilsCrossed className="w-12 h-12 mb-4 text-orange-500" />,
      route: '/food-registration',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">What would you like to register?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate(category.route)}
              className={`${category.bgColor} p-8 rounded-xl cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="flex flex-col items-center text-center">
                {category.icon}
                <h3 className="text-xl font-semibold text-gray-900">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCategorySelect; 