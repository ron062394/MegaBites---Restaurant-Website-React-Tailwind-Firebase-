import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Logo = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Link to="/">
      <motion.div 
        className="text-2xl text-gray-800 tracking-wide"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <span className="italic font-bold relative text-shadow-md -top-2 bg-gray-900 text-white">Tonkotsu</span>
        <span className="italic font-bold text-shadow-md bg-white text-gray-800">Corner</span>
      </motion.div>
    </Link>
  );
};

export default Logo;
