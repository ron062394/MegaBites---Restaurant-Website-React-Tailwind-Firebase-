import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpinner, FaBowlRice, FaFire, FaLeaf } from 'react-icons/fa6';
import { GiChopsticks } from 'react-icons/gi';

const Loading = () => {
  const [loadingText, setLoadingText] = useState('Boiling the broth');
  const loadingSteps = ['Boiling the broth', 'Cooking the noodles', 'Adding toppings', 'Preparing your ramen'];
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % loadingSteps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setLoadingText(loadingSteps[currentStep]);
  }, [currentStep]);

  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const textVariants = {
    enter: { y: 20, opacity: 0 },
    center: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-black text-white">
      <motion.div 
        className="text-4xl tracking-wide p-10 mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
       <span className="italic font-bold relative text-shadow-md -top-2 text-gray-100">Tonkotsu</span>
       <span className="italic font-bold text-shadow-md bg-white text-gray-800">Corner</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div 
          className="flex justify-center space-x-6 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          <motion.div variants={iconVariants}><FaFire className="text-5xl text-red-500" /></motion.div>
          <motion.div variants={iconVariants}><FaBowlRice className="text-5xl text-yellow-500" /></motion.div>
          <motion.div variants={iconVariants}><FaLeaf className="text-5xl text-green-500" /></motion.div>
          <motion.div variants={iconVariants}><GiChopsticks className="text-5xl text-white" /></motion.div>
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <FaSpinner className="text-7xl text-yellow-500 mb-6 mx-auto" />
        </motion.div>
        <h1 className="text-4xl font-bold text-white mb-4">Loading...</h1>
        <AnimatePresence mode="wait">
          <motion.p
            key={loadingText}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="text-2xl text-gray-300"
          >
            {loadingText}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Loading;
