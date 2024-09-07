import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black text-white">
      <motion.div 
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-4xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold text-lg hover:bg-gray-200 transition duration-300"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
