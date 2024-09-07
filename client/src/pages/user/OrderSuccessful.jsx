import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const OrderSuccessful = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg text-center"
      >
        <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
        <p className="text-xl mb-6">Thank you for your order. Your ramen is on its way!</p>
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-600 transition duration-300 flex items-center justify-center mx-auto"
          >
            <FaHome className="mr-2" />
            Back to Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default OrderSuccessful;
