import React from 'react';
import { motion } from 'framer-motion';
import { FaTruck, FaUtensils, FaCalendarAlt } from 'react-icons/fa';

const Services = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const services = [
    {
      icon: <FaTruck />,
      title: "Fast Delivery",
      description: "Enjoy our quick and reliable delivery service right to your doorstep."
    },
    {
      icon: <FaUtensils />,
      title: "Dine-In Experience",
      description: "Savor the authentic atmosphere in our cozy restaurant setting."
    },
    {
      icon: <FaCalendarAlt />,
      title: "Easy Reservations",
      description: "Book your table in advance for a guaranteed spot at peak hours."
    }
  ];

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black text-white py-24">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-5xl lg:text-6xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-800 rounded-3xl shadow-2xl p-10 text-center hover:bg-gray-700 transition duration-300 transform hover:-translate-y-2 hover:scale-105"
            >
              <div className="text-6xl mb-8 text-yellow-400">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-6">{service.title}</h3>
              <p className="text-gray-300 text-lg">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
