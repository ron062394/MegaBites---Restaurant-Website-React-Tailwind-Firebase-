import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUtensils, FaLeaf, FaFire } from 'react-icons/fa';
import { GiSpoon, GiChopsticks } from 'react-icons/gi';

const Hero = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const rotateIn = {
    hidden: { opacity: 0, rotate: -180 },
    visible: { opacity: 1, rotate: 0 },
  };

  const spin = {
    animate: {
      rotate: 360,
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const featureItems = [
    { icon: <FaUtensils />, text: "Authentic Recipe" },
    { icon: <FaLeaf />, text: "Fresh Ingredients" },
    { icon: <FaFire />, text: "Rich Flavors" },
  ];

  return (
    <div className="hero min-h-[70vh] h-[70vh] flex bg-gradient-to-r from-gray-900 to-black text-white py-24">
      <div className="container mx-auto px-4 py-8 relative flex flex-col lg:flex-row items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="lg:w-1/2 w-full text-center lg:text-left mb-10 lg:mb-0"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-shadow-lg">
            Welcome to<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
              Tonkotsu Corner
            </span>
          </h1>
          <p className="text-lg lg:text-xl mb-8 leading-relaxed">
            Experience the rich, authentic flavors of our signature Tonkotsu ramen. 
            Immerse yourself in a bowl of comfort, crafted with passion and tradition.
          </p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/menu"
              className="btn px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300 bg-gray-800 text-white font-bold text-lg hover:bg-gray-700"
            >
              Explore Our Menu
            </Link>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4"
          >
            {featureItems.map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="text-2xl mr-2">{item.icon}</span>
                <span className="text-base">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={rotateIn}
          transition={{ duration: 1 }}
          className="lg:w-1/2 w-full flex items-center justify-center mt-8 lg:mt-0 relative"
        >
          <img
            src="https://d3nrav7vo3lya8.cloudfront.net/categories/ramen/ramen-eating.webp"
            alt="Tonkotsu Ramen"
            className="rounded-full shadow-2xl max-w-full lg:max-w-2xl w-full border-8 border-gray-800 relative top-36"
          />
          <motion.div
            className="absolute top-32 left-24"
            variants={spin}
            animate="animate"
          >
            <GiSpoon className="text-6xl text-yellow-400" />
          </motion.div>
          <motion.div
            className="absolute bottom-0 right-4"
            variants={spin}
            animate="animate"
          >
            <GiChopsticks className="text-6xl text-yellow-400" />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        >
          <div className="bg-gray-800 rounded-full p-3 shadow-lg">
            <p className="text-2xl font-bold">Slurp the Goodness!</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
