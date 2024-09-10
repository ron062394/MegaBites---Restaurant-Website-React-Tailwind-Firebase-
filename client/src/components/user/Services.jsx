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
      description: "Quick and reliable delivery to your doorstep. Our dedicated delivery team ensures your ramen arrives hot and fresh, maintaining the quality you expect from Tonkotsu Corner."
    },
    {
      icon: <FaUtensils />,
      title: "Dine-In Experience",
      description: "Authentic atmosphere in our cozy restaurant. Immerse yourself in the ambiance of a traditional Japanese ramen shop while enjoying our signature dishes prepared right before your eyes."
    },
    {
      icon: <FaCalendarAlt />,
      title: "Easy Reservations",
      description: "Book your table in advance for peak hours. Our user-friendly reservation system allows you to secure your spot, ensuring a seamless dining experience even during our busiest times."
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
