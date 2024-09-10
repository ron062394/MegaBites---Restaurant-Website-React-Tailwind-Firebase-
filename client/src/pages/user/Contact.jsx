import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserPlus, FaUtensils, FaLeaf, FaFire } from 'react-icons/fa';
import { GiSpoon, GiChopsticks } from 'react-icons/gi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log('Form submitted:', formData);
      toast.success('Message sent successfully');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const rotateIn = {
    hidden: { opacity: 0, rotate: -180 },
    visible: { opacity: 1, rotate: 0 },
  };

  const spin = {
    animate: {
      rotate: 360,
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const renderInputField = (id, label, icon, type = 'text') => (
    <div className="mb-4 relative">
      <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-yellow-400">
          {icon}
        </span>
        <input
          className="shadow appearance-none border rounded-full w-full py-3 pl-10 pr-3 text-gray-300 bg-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
          id={id}
          name={id}
          type={type}
          placeholder={`Enter your ${id}`}
          value={formData[id]}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-black">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="w-full max-w-7xl">
        <motion.div
          className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="flex flex-col md:flex-row">
            {/* Left side - Content */}
            <div className="md:w-1/2 bg-gray-900 p-12 flex items-center justify-center relative">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://d3nrav3vo3lya8.cloudfront.net/categories/ramen/ramen-eating.webp')",
                  filter: "brightness(0.3)"
                }}
              ></div>
              <div className="text-white relative z-10 text-center">
                <motion.h1 
                  className="text-4xl lg:text-6xl font-bold mb-6 text-shadow-lg"
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                >
                  Welcome to<br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
                    Tonkotsu Corner
                  </span>
                </motion.h1>
                <p className="mb-10 text-xl leading-relaxed">Have a question or feedback? We'd love to hear from you! Reach out to us and we'll get back to you as soon as possible.</p>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    to="/menu"
                    className="btn px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300 bg-gray-800 text-white font-bold text-lg hover:bg-gray-700"
                  >
                    Explore Our Menu
                  </Link>
                </motion.div>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  transition={{ delay: 0.6 }}
                  className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4"
                >
                  {[
                    { icon: <FaUtensils />, text: "Authentic Recipe" },
                    { icon: <FaLeaf />, text: "Fresh Ingredients" },
                    { icon: <FaFire />, text: "Rich Flavors" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-2xl mr-2 text-yellow-400">{item.icon}</span>
                      <span className="text-base">{item.text}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Right side - Contact Form */}
            <div className="md:w-1/2 p-12 bg-gray-800 relative">
              <motion.div
                className="absolute top-4 left-4"
                variants={spin}
                animate="animate"
              >
                <GiSpoon className="text-4xl text-yellow-400" />
              </motion.div>
              <motion.div
                className="absolute bottom-4 right-4"
                variants={spin}
                animate="animate"
              >
                <GiChopsticks className="text-4xl text-yellow-400" />
              </motion.div>
              <h2 className="text-4xl font-bold mb-10 text-white text-center">
                Get in Touch
              </h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                {renderInputField('name', 'Full Name', <FaUserPlus className="text-yellow-400" />)}
                {renderInputField('email', 'Email address', <FaEnvelope className="text-yellow-400" />, 'email')}
                <div className="mb-4 relative">
                  <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="shadow appearance-none border rounded-lg w-full py-3 px-3 text-gray-300 bg-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
                    required
                  ></textarea>
                </div>
                
                {error && <p className="text-red-500 text-sm italic">{error}</p>}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full justify-center py-3 px-4 border border-yellow-400 rounded-full shadow-lg text-lg font-medium text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition duration-300 ease-in-out"
                  type="submit"
                >
                  Send Message
                </motion.button>
              </form>

              <div className="mt-10">
                <h3 className="text-2xl font-semibold mb-4 text-white">Contact Information</h3>
                <div className="space-y-4">
                  <motion.div className="flex items-center" whileHover={{ x: 10 }}>
                    <FaEnvelope className="text-yellow-400 mr-3" />
                    <a href="mailto:info@tonkotsucorner.com" className="text-gray-300 hover:text-yellow-500 transition duration-300">info@tonkotsucorner.com</a>
                  </motion.div>
                  <motion.div className="flex items-center" whileHover={{ x: 10 }}>
                    <FaPhone className="text-yellow-400 mr-3" />
                    <a href="tel:+15551234567" className="text-gray-300 hover:text-yellow-500 transition duration-300">+1 (555) 123-4567</a>
                  </motion.div>
                  <motion.div className="flex items-center" whileHover={{ x: 10 }}>
                    <FaMapMarkerAlt className="text-yellow-400 mr-3" />
                    <span className="text-gray-300">123 Ramen Street, Noodle City, RC 12345</span>
                  </motion.div>
                </div>
                <motion.div 
                  className="mt-8 bg-gray-700 p-4 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="text-xl font-semibold mb-2 text-white">Opening Hours</h3>
                  <p className="text-gray-300">Monday - Friday: 11:00 AM - 10:00 PM</p>
                  <p className="text-gray-300">Saturday - Sunday: 12:00 PM - 11:00 PM</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
