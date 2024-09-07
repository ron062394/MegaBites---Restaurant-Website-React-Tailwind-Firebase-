import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner, FaBowlRice, FaFire, FaLeaf } from 'react-icons/fa6';

const Loading = () => {
  const [loadingText, setLoadingText] = useState('Boiling the broth');
  const loadingSteps = ['Boiling the broth', 'Cooking the noodles', 'Adding toppings', 'Preparing your ramen'];

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(prevText => {
        const currentIndex = loadingSteps.indexOf(prevText);
        return loadingSteps[(currentIndex + 1) % loadingSteps.length];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div 
          className="flex justify-center space-x-4 mb-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          <motion.div variants={iconVariants}><FaFire className="text-4xl text-red-500" /></motion.div>
          <motion.div variants={iconVariants}><FaBowlRice className="text-4xl text-yellow-500" /></motion.div>
          <motion.div variants={iconVariants}><FaLeaf className="text-4xl text-green-500" /></motion.div>
        </motion.div>
        <FaSpinner className="text-6xl text-yellow-500 animate-spin mb-4 mx-auto" />
        <h1 className="text-3xl font-bold text-white mb-2">Loading...</h1>
        <p className="text-xl text-gray-300">{loadingText}</p>
      </motion.div>
    </div>
  );
};

export default Loading;
