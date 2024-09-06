import React from 'react';

const Hero = () => {
  return (
    <div className="hero bg-gray-200 p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to MegaBites</h1>
      <p className="text-lg mb-6">Your one-stop destination for delicious meals and great dining experiences.</p>
      <img src="https://via.placeholder.com/600x400" alt="Hero Placeholder" className="mx-auto mb-6" />
      <button className="btn px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 bg-red-900 text-white font-bold">
        Explore Our Menu
      </button>
    </div>
  );
};

export default Hero;

