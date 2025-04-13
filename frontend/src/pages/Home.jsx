import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login'); // Navigate to the login page on button click
  }


 
  return (
    <div className="relative w-screen h-screen">
      {/* Background Image */}
      <img
        src="https://i.pinimg.com/736x/58/33/ac/5833ac0c066a34fc0ba67f3627c4a56d.jpg"
        alt="gymbgv"
        className="absolute inset-0 w-full h-full object-cover"
      />
<div className='absolute top-0 left-0 p-4'>
      <img src='https://sdmntpreastus2.oaiusercontent.com/files/00000000-d48c-61f6-8c99-2b348efe27bd/raw?se=2025-04-11T19%3A50%3A28Z&sp=r&sv=2024-08-04&sr=b&scid=0506a1ea-6ec7-5e14-8681-466562da8f80&skoid=3f3a9132-9530-48ef-96b7-fee5a811733f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-10T21%3A17%3A59Z&ske=2025-04-11T21%3A17%3A59Z&sks=b&skv=2024-08-04&sig=tKsurzuVq7NAQWENX1UNiEPjFwwf%2BJs%2BcE/2lRa7zlM%3D' alt='logo' className='h-12 w-auto' />
      </div>

      {/* Overlay and Full-Width Button */}
      <div className="absolute bottom-2 left-0 w-full">
        <button onClick = {handleClick}className="w-full bg-blue-600 text-white py-4 text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Continue
        </button>
      </div>
    </div>
  );
}

export default Home;
