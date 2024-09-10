import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser, FaClock, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, 'ContactMessages'), {
        ...formData,
        createdAt: new Date().toISOString()
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
      toast.success('Message sent successfully! We\'ll get back to you soon.');
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const socialLinks = [
    { icon: <FaInstagram />, url: 'https://instagram.com/tonkotsucorner' },
    { icon: <FaFacebook />, url: 'https://facebook.com/tonkotsucorner' },
    { icon: <FaTwitter />, url: 'https://twitter.com/tonkotsucorner' },
  ];

  return (
    <section id='contact' className="bg-gradient-to-r from-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
          ref={ref}
        >
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600 mb-4">Get in Touch</h2>
          <p className="mt-4 text-2xl text-gray-300">We're always here to serve you better!</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            className="bg-white rounded-2xl overflow-hidden shadow-2xl p-8 text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaUser className="text-gray-400" />
                  </span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-yellow-500 transition duration-300"
                    placeholder="Your Name"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaEnvelope className="text-gray-400" />
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-yellow-500 transition duration-300"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone (Optional)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaPhone className="text-gray-400" />
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-yellow-500 transition duration-300"
                    placeholder="Your Phone Number"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-yellow-500 transition duration-300"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-yellow-500 text-white px-4 py-3 rounded-lg font-bold hover:bg-yellow-600 transition duration-300"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </motion.div>
          <motion.div
            className="bg-white rounded-2xl overflow-hidden shadow-2xl p-8 text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h3>
            <div className="space-y-6">
              <p className="flex items-center text-gray-600">
                <FaEnvelope className="mr-4 text-yellow-500 text-xl" />
                <a href="mailto:info@tonkotsucorner.com" className="hover:text-yellow-500 transition duration-300">info@tonkotsucorner.com</a>
              </p>
              <p className="flex items-center text-gray-600">
                <FaPhone className="mr-4 text-yellow-500 text-xl" />
                <a href="tel:+15551234567" className="hover:text-yellow-500 transition duration-300">+1 (555) 123-4567</a>
              </p>
              <p className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-4 text-yellow-500 text-xl" />
                123 Ramen Street, Noodle City, RC 12345
              </p>
            </div>
            <div className="mt-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FaClock className="mr-2 text-yellow-500" /> Opening Hours
              </h4>
              <p className="text-gray-600">Monday - Friday: 11:00 AM - 10:00 PM</p>
              <p className="text-gray-600">Saturday - Sunday: 12:00 PM - 11:00 PM</p>
            </div>
            <div className="mt-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-yellow-500 transition duration-300 text-2xl"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
