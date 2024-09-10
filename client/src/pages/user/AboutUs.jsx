import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUtensils, FaHistory, FaHeart, FaLeaf, FaUsers, FaAward, FaHandshake, FaImage } from 'react-icons/fa';

const AboutUs = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const sections = [
    {
      title: 'Our Story',
      icon: FaHistory,
      content: 'Founded in 2010, Tonkotsu Corner has been serving the community with delicious, soul-warming ramen for over a decade. Our journey began with a passion for authentic Japanese flavors and a dream to bring the best ramen experience to our customers.'
    },
    {
      title: 'Our Cuisine',
      icon: FaUtensils,
      content: 'We specialize in authentic Japanese ramen, particularly our signature Tonkotsu ramen, crafted with care using traditional techniques and the finest ingredients. Our rich, creamy broth is simmered for 20 hours to extract maximum flavor.'
    },
    {
      title: 'Our Passion',
      icon: FaHeart,
      content: 'We\'re passionate about bringing the authentic flavors of Japan to your table, one steaming bowl of ramen at a time. Our dedication to quality and taste is evident in every dish we serve, from our perfectly cooked noodles to our carefully selected toppings.'
    },
    {
      title: 'Sustainability',
      icon: FaLeaf,
      content: 'At Tonkotsu Corner, we\'re committed to sustainable practices. We source our ingredients locally when possible and strive to minimize our environmental impact. Our eco-friendly packaging and waste reduction initiatives reflect our dedication to preserving our planet.'
    },
    {
      title: 'Our Team',
      icon: FaUsers,
      content: 'Our dedicated team of chefs, servers, and staff work tirelessly to ensure you have the best dining experience. We\'re a family, and we treat our customers as part of it. Each member of our team is passionate about ramen and committed to providing exceptional service.'
    },
    {
      title: 'Awards & Recognition',
      icon: FaAward,
      content: 'Our commitment to excellence has not gone unnoticed. We\'re proud to have been recognized as the "Best Ramen Restaurant" in the city for three consecutive years. Our chef\'s special Tonkotsu ramen was also featured in "Japan Culinary Magazine" as one of the top 10 ramen dishes outside Japan.'
    },
    {
      title: 'Community Involvement',
      icon: FaHandshake,
      content: 'We believe in giving back to the community that has supported us. Tonkotsu Corner regularly participates in local food festivals, sponsors community events, and donates to local charities. Our annual "Ramen for a Cause" event has raised over $50,000 for various local non-profits.'
    }
  ];

  return (
    <section id='about-us' className="bg-gradient-to-r from-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600 mb-4">About Tonkotsu Corner</h2>
          <p className="mt-4 text-2xl text-gray-300">Discover our passion for authentic ramen</p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {sections.map((section, index) => (
              <motion.div 
                key={section.title}
                className="bg-white rounded-2xl overflow-hidden shadow-2xl transform transition duration-500 hover:scale-105 flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <section.icon className="text-4xl mb-4 text-yellow-500" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{section.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.6 }}
        >
          <button className="btn px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300 bg-gradient-to-r from-yellow-400 to-red-500 text-white font-bold text-lg hover:from-yellow-500 hover:to-red-600 inline-flex items-center">
            <FaUtensils className="mr-2" />
            Make a Reservation
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
