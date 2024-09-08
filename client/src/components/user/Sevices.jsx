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
      description: "Quick and reliable delivery to your doorstep."
    },
    {
      icon: <FaUtensils />,
      title: "Dine-In Experience",
      description: "Authentic atmosphere in our cozy restaurant."
    },
    {
      icon: <FaCalendarAlt />,
      title: "Easy Reservations",
      description: "Book your table in advance for peak hours."
    }
  ];

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black text-white py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6 hover:from-gray-700 hover:to-gray-800 transition duration-300 transform hover:-translate-y-1 hover:scale-102 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-red-500"></div>
              <div className="text-5xl mb-4 text-yellow-400 transition-all duration-300 transform group-hover:scale-105 group-hover:rotate-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-yellow-300 text-left">{service.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed text-left">{service.description}</p>
              <div className="flex justify-start mt-4">
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-1 bg-yellow-500 text-gray-900 rounded-full font-semibold text-sm hover:bg-yellow-400 transition duration-300"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
