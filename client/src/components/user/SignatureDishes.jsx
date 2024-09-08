import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUtensils, FaStar } from 'react-icons/fa';

const SignatureDishes = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const dishes = [
    {
      name: "Garlic Tonkotsu",
      description: "Rich pork bone broth, tender chashu pork, soft-boiled egg, bamboo shoots, wood ear mushrooms, and garlic oil.",
      image: "https://placehold.co/400x300?text=Garlic+Tonkotsu",
      rating: 4.9,
      price: "$14.99"
    },
    {
      name: "Yuzu Shio Ramen",
      description: "Light and refreshing chicken-seafood broth infused with yuzu citrus. Topped with pork chashu, menma, soft-boiled egg.",
      image: "https://placehold.co/400x300?text=Yuzu+Shio+Ramen",
      rating: 4.7,
      price: "$15.99"
    },
    {
      name: "Spicy Ramen",
      description: "Fiery red broth with ground pork and chicken, spicy bean paste, and chili oil. Topped with chashu pork and vegetables.",
      image: "https://placehold.co/400x300?text=Spicy+Ramen",
      rating: 4.8,
      price: "$14.99"
    },
    {
      name: "Shoyu Ramen",
      description: "Classic soy sauce based broth with wavy noodles. Topped with chashu pork, menma, nori, and ajitama egg.",
      image: "https://placehold.co/400x300?text=Shoyu+Ramen",
      rating: 4.6,
      price: "$13.99"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black py-24">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl lg:text-6xl font-bold text-center mb-12 text-shadow-lg"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
            TonkotsuCorner's Signature Dishes
          </span>
        </motion.h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div 
            className="lg:w-1/2"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <img src="https://placehold.co/800x600?text=Signature+Ramen" alt="Signature Ramen" className="w-full h-full object-cover rounded-lg shadow-lg" />
          </motion.div>
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dishes.map((dish, index) => (
              <motion.div 
                key={index}
                className="bg-white bg-opacity-10 rounded-lg overflow-hidden shadow-lg backdrop-filter backdrop-blur-lg transform transition duration-500 hover:scale-105"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <img src={dish.image} alt={dish.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{dish.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{dish.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-white font-bold">{dish.rating}</span>
                    </div>
                    <span className="text-white font-bold">{dish.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          className="text-center mt-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/menu"
            className="btn px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300 bg-gradient-to-r from-yellow-400 to-red-500 text-white font-bold text-lg hover:from-yellow-500 hover:to-red-600 inline-flex items-center"
          >
            <FaUtensils className="mr-2" />
            Explore Full Menu
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default SignatureDishes;
