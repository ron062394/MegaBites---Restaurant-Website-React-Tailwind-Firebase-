import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBowlRice, FaFire, FaLeaf } from 'react-icons/fa6';
import { GiChopsticks } from 'react-icons/gi';

const NotFoundPage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black text-white">
      <motion.div 
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <motion.div 
          className="text-4xl tracking-wide p-10 mb-8"
          variants={fadeInUp}
        >
          <span className="italic font-bold relative text-shadow-md -top-2 text-gray-100">Tonkotsu</span>
          <span className="italic font-bold text-shadow-md bg-white text-gray-800">Corner</span>
        </motion.div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-4xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-xl mb-8">Oops! It seems we've misplaced this bowl of ramen.</p>
        <motion.div 
          className="flex justify-center space-x-6 mb-8"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          <motion.div variants={iconVariants}><FaFire className="text-5xl text-red-500" /></motion.div>
          <motion.div variants={iconVariants}><FaBowlRice className="text-5xl text-yellow-500" /></motion.div>
          <motion.div variants={iconVariants}><FaLeaf className="text-5xl text-green-500" /></motion.div>
          <motion.div variants={iconVariants}><GiChopsticks className="text-5xl text-white" /></motion.div>
        </motion.div>
        <Link 
          to="/" 
          className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold text-lg hover:bg-gray-200 transition duration-300"
        >
          Return to Main Menu
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
