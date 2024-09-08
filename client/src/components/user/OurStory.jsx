import React from 'react';
import { motion } from 'framer-motion';
import { FaUtensils, FaHistory, FaLeaf, FaUserTie, FaHome } from 'react-icons/fa';

const OurStory = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const features = [
    { icon: <FaLeaf />, title: "Fresh Ingredients", description: "We source only the finest, freshest ingredients for our ramen." },
    { icon: <FaUserTie />, title: "Expert Chefs", description: "Our skilled chefs bring years of experience to every bowl." },
    { icon: <FaHome />, title: "Cozy Atmosphere", description: "Enjoy your meal in our warm and inviting restaurant." },
  ];

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black py-24">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl lg:text-6xl font-bold text-center mb-12 text-shadow-lg"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
            Our Story
          </span>
        </motion.h2>
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <motion.div 
            className="lg:w-1/2"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <img src="https://asianinspirations.com.au/wp-content/uploads/2021/03/Iconic-Japanese-Ramen-For-You-To-Savour_00-Feat-Img.jpg" alt="Our Story" className="w-full rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300" />
          </motion.div>
          <motion.div 
            className="lg:w-1/2"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-3xl font-semibold text-white mb-4">From Passion to Perfection</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              TonkotsuCorner began with a simple dream: to bring authentic Japanese ramen to our community. Our journey started in a small kitchen, experimenting with recipes passed down through generations. Today, we're proud to serve you the most delicious and authentic ramen, crafted with love and tradition.
            </p>
            <motion.div 
              className="space-y-4"
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="flex items-center" variants={fadeInUp}>
                <FaUtensils className="text-yellow-400 mr-3 text-2xl" />
                <span className="text-white text-lg">Authentic recipes perfected over time</span>
              </motion.div>
              <motion.div className="flex items-center" variants={fadeInUp}>
                <FaHistory className="text-yellow-400 mr-3 text-2xl" />
                <span className="text-white text-lg">Decades of culinary tradition</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-gray-800 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="text-4xl text-yellow-400 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default OurStory;
