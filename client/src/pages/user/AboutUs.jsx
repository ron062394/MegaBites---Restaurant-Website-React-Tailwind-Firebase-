import React from 'react';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white py-16">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-16 text-gray-100"
        >
          About Tonkotsu Corner
        </motion.h1>
        
        <div className="grid md:grid-cols-3 gap-10 mb-16">
          {sections.slice(0, 3).map((section, index) => (
            <motion.div 
              key={section.title}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              <section.icon className="text-5xl mb-6 text-gray-700" />
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">{section.title}</h2>
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-semibold mb-8 text-center text-gray-100">Our Restaurant</h2>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden p-6">
            <div className="bg-gray-200 h-[500px] rounded-lg flex items-center justify-center overflow-hidden">
              <FaImage className="text-8xl text-gray-400 transition-transform duration-300 transform hover:scale-110" />
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {sections.slice(3, 7).map((section, index) => (
            <motion.div 
              key={section.title}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 1.4 + (0.2 * index) }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              <section.icon className="text-5xl mb-6 text-gray-700" />
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">{section.title}</h2>
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 2.2 }}
          className="text-center bg-white rounded-2xl shadow-2xl overflow-hidden p-10"
        >
          <h2 className="text-4xl font-semibold mb-6 text-gray-800">Visit Us Today</h2>
          <p className="text-xl text-gray-700">Experience the authentic taste of Japan at Tonkotsu Corner. We look forward to serving you!</p>
          <button className="mt-8 bg-gray-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 shadow-lg">
            Make a Reservation
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
