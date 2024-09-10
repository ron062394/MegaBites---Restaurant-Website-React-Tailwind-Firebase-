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
      image: "https://www.foodandwine.com/thmb/0AXGLeY6dYnY8sEXFqxBa8opDrs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Tonkotsu-Ramen-FT-BLOG1122-8fe6c12d609a4fd4ab246bea3aae140e.jpg",
      rating: 4.9,
      price: "$14.99"
    },
    {
      name: "Yuzu Shio Ramen",
      description: "Light and refreshing chicken-seafood broth infused with yuzu citrus. Topped with pork chashu, menma, soft-boiled egg.",
      image: "https://images.squarespace-cdn.com/content/v1/5fee116050339566e9b38f09/1624987477381-CE845WV6C0TUP2M2UXWI/Shoyu-ramen-whiskey-and-booch-72-1.jpg",
      rating: 4.7,
      price: "$15.99"
    },
    {
      name: "Spicy Ramen",
      description: "Fiery red broth with ground pork and chicken, spicy bean paste, and chili oil. Topped with chashu pork and vegetables.",
      image: "https://media.istockphoto.com/id/1135293039/photo/ramen-asian-noodle-in-broth-with-beef-tongue-meat-mushroom-and-ajitama-pickled-egg-in-bowl-on.jpg?s=612x612&w=0&k=20&c=TURfMpmtRVxQwtlVpFOP0wvobPin2z98cTRbzkyN5yM=",
      rating: 4.8,
      price: "$14.99"
    },
    {
      name: "Shoyu Ramen",
      description: "Classic soy sauce based broth with wavy noodles. Topped with chashu pork, menma, nori, and ajitama egg.",
      image: "https://media.istockphoto.com/id/1303446691/photo/a-shoyu-ramen-in-gray-bowl-on-concrete-table-top-japanese-cuisine-meat-noodle-soup-with.jpg?s=612x612&w=0&k=20&c=aD-Fr7g86n8S-DUgwmc3cfar4Z4yT8ibz9__2WDgztU=",
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
            <img src="https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp" alt="Signature Ramen" className="w-full h-full object-cover rounded-lg shadow-lg" />
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
                <div className="p-4 text-left">
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
