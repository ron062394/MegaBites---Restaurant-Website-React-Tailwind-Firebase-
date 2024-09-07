import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaUsers, FaLeaf, FaUtensils, FaClipboardList, FaHandshake, FaUser, FaEnvelope, FaPhone, FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Careers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    resume: null
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const jobOpenings = [
    { title: 'Ramen Chef', description: 'Craft exquisite ramen dishes with passion and creativity.' },
    { title: 'Front of House Manager', description: 'Lead our customer service team to provide exceptional dining experiences.' },
    { title: 'Kitchen Assistant', description: 'Support our chefs and learn the art of ramen preparation.' },
    { title: 'Customer Service Representative', description: 'Be the friendly face of Tonkotsu Corner, ensuring guest satisfaction.' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      resume: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast.success('Application submitted successfully!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      resume: null
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-16">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="container mx-auto px-4">
        <motion.h1 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-12"
        >
          Join the <span className="text-yellow-500">Tonkotsu Corner</span> Family
        </motion.h1>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: FaBriefcase, title: "Exciting Opportunities", content: "Explore diverse roles in our growing ramen empire. From kitchen to management, find your perfect fit." },
            { icon: FaUsers, title: "Collaborative Culture", content: "Join a team that values creativity, innovation, and a shared passion for exceptional ramen." },
            { icon: FaLeaf, title: "Personal Growth", content: "Nurture your skills and advance your career with our comprehensive training programs." }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 * index }}
              className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <item.icon className="text-5xl mb-6 text-yellow-500" />
              <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>
              <p className="text-gray-300">{item.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-gray-800 p-8 rounded-lg shadow-lg mb-16"
        >
          <h2 className="text-3xl font-semibold mb-6 text-center">Current Openings</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {jobOpenings.map((job, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-700 p-6 rounded-lg"
              >
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <FaUtensils className="mr-2 text-yellow-500" />
                  {job.title}
                </h3>
                <p className="text-gray-300 mb-4">{job.description}</p>
                <Link to="#application-form" className="text-yellow-500 hover:text-yellow-400 transition duration-300">
                  Apply Now →
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 1 }}
          className="bg-gray-800 p-8 rounded-lg shadow-lg mb-16"
          id="application-form"
        >
          <h2 className="text-3xl font-semibold mb-6 text-center">Apply Now</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-700 focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 sm:text-sm border-gray-600 rounded-md"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-700 focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 sm:text-sm border-gray-600 rounded-md"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="bg-gray-700 focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 sm:text-sm border-gray-600 rounded-md"
                  placeholder="(123) 456-7890"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-300">Position</label>
              <select
                id="position"
                name="position"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md bg-gray-700"
                value={formData.position}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a position</option>
                {jobOpenings.map((job, index) => (
                  <option key={index} value={job.title}>{job.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-300">Resume</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <FaFileAlt className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-400">
                    <label htmlFor="resume" className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-yellow-500 hover:text-yellow-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yellow-500">
                      <span>Upload a file</span>
                      <input id="resume" name="resume" type="file" className="sr-only" onChange={handleFileChange} required />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    PDF, DOC, DOCX up to 10MB
                  </p>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Submit Application
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold mb-6">Why Choose Tonkotsu Corner?</h2>
          <div className="flex justify-center space-x-8 mb-8">
            <div className="flex items-center">
              <FaClipboardList className="text-3xl text-yellow-500 mr-2" />
              <span>Competitive Salary</span>
            </div>
            <div className="flex items-center">
              <FaLeaf className="text-3xl text-yellow-500 mr-2" />
              <span>Work-Life Balance</span>
            </div>
            <div className="flex items-center">
              <FaHandshake className="text-3xl text-yellow-500 mr-2" />
              <span>Inclusive Environment</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Careers;
