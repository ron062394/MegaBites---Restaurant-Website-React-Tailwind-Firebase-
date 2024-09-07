import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="hero min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-8"
        >
          <h1 className="text-6xl font-bold mb-4">Welcome to Tonkotsu Corner</h1>
          <p className="text-xl mb-6">Experience the rich, authentic flavors of our signature Tonkotsu ramen.</p>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <img 
            src="https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp" 
            alt="Tonkotsu Ramen" 
            className="mx-auto mb-8 rounded-lg shadow-2xl max-w-2xl w-full"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <Link to="/menu" className="btn px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 bg-gray-800 text-white font-bold text-lg hover:bg-gray-700">
            Explore Our Menu
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
