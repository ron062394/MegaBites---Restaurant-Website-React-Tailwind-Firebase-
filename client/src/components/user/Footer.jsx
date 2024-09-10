import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUtensils, FaClock, FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from '../utils/Logo';

const Footer = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const socialLinks = [
    { icon: FaFacebook, url: 'https://facebook.com/tonkotsucorner', label: 'Facebook' },
    { icon: FaInstagram, url: 'https://instagram.com/tonkotsucorner', label: 'Instagram' },
    { icon: FaTwitter, url: 'https://twitter.com/tonkotsucorner', label: 'Twitter' },
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Contact', path: '/contact' },
    { name: 'Careers', path: '/careers' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer id='footer' className="bg-gradient-to-r from-gray-900 to-black text-white py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="col-span-1 md:col-span-2"
          >
            <Logo className="mb-6 w-40 h-auto" />
            <p className="text-gray-300 mb-6 text-lg leading-relaxed text-left">Tonkotsu Corner is dedicated to delivering exceptional ramen experiences with our authentic Japanese cuisine and warm hospitality. Our passion for quality ingredients and traditional techniques ensures every bowl tells a story.</p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition duration-300" aria-label={link.label}>
                  <link.icon className="h-8 w-8" />
                </a>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 text-left">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-yellow-400 mr-3 flex-shrink-0 text-xl" />
                <p className="text-gray-300 text-left">123 Ramen Street, Noodle City, RC 12345</p>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-yellow-400 mr-3 flex-shrink-0 text-xl" />
                <p className="text-gray-300 text-left">(123) 456-7890</p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-yellow-400 mr-3 flex-shrink-0 text-xl" />
                <p className="text-gray-300 text-left">slurp@tonkotsucorner.com</p>
              </div>
              <div className="flex items-center">
                <FaClock className="text-yellow-400 mr-3 flex-shrink-0 text-xl" />
                <p className="text-gray-300 text-left">Mon-Sun: 11:00 AM - 10:00 PM</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 text-left">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-gray-300 hover:text-yellow-400 transition duration-300 flex items-center group">
                    <FaUtensils className="mr-3 text-yellow-400 group-hover:rotate-45 transition-transform duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        <motion.div 
          className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-start"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0 text-left">&copy; {new Date().getFullYear()} Tonkotsu Corner. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link to="/terms-of-service" className="text-gray-400 hover:text-yellow-400 transition duration-300 text-sm">Terms of Service</Link>
            <Link to="/privacy-policy" className="text-gray-400 hover:text-yellow-400 transition duration-300 text-sm">Privacy Policy</Link>
          </div>
        </motion.div>
      </div>
      <button 
        onClick={scrollToTop} 
        className="absolute bottom-8 right-8 bg-yellow-400 text-gray-900 p-3 rounded-full hover:bg-yellow-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;
