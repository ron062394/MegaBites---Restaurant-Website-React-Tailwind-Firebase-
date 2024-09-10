import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaUsers, FaLeaf, FaUtensils, FaClipboardList, FaHandshake, FaUser, FaEnvelope, FaPhone, FaFileAlt, FaStar, FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Careers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    resume: null,
    coverLetter: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeJobIndex, setActiveJobIndex] = useState(0);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const jobOpenings = [
    { 
      title: 'Ramen Chef', 
      description: 'Craft exquisite ramen dishes with passion and creativity.',
      requirements: ['3+ years of culinary experience', 'Proficiency in Japanese cuisine', 'Strong teamwork skills'],
      benefits: ['Competitive salary', 'Health insurance', 'Professional development opportunities']
    },
    { 
      title: 'Front of House Manager', 
      description: 'Lead our customer service team to provide exceptional dining experiences.',
      requirements: ['5+ years in restaurant management', 'Excellent communication skills', 'Ability to work under pressure'],
      benefits: ['Performance bonuses', 'Flexible schedule', 'Employee discounts']
    },
    { 
      title: 'Kitchen Assistant', 
      description: 'Support our chefs and learn the art of ramen preparation.',
      requirements: ['1+ year kitchen experience', 'Food safety certification', 'Willingness to learn'],
      benefits: ['On-the-job training', 'Career advancement opportunities', 'Meal allowance']
    },
    { 
      title: 'Customer Service Representative', 
      description: 'Be the friendly face of Tonkotsu Corner, ensuring guest satisfaction.',
      requirements: ['Previous customer service experience', 'Positive attitude', 'Ability to multitask'],
      benefits: ['Tip sharing program', 'Employee recognition rewards', 'Team building events']
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveJobIndex((prevIndex) => (prevIndex + 1) % jobOpenings.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [jobOpenings.length]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      toast.success('Application submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        resume: null,
        coverLetter: ''
      });
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
          className="text-5xl font-bold mb-12 text-left"
        >
          Join the <span className="text-yellow-500">Tonkotsu Corner</span> Family
        </motion.h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8"
            >
              <h2 className="text-3xl font-semibold mb-6 text-left">Why Choose Tonkotsu Corner?</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaClipboardList className="text-3xl text-yellow-500 mr-4" />
                  <span>Competitive Salary and Benefits</span>
                </div>
                <div className="flex items-center">
                  <FaLeaf className="text-3xl text-yellow-500 mr-4" />
                  <span>Work-Life Balance</span>
                </div>
                <div className="flex items-center">
                  <FaHandshake className="text-3xl text-yellow-500 mr-4" />
                  <span>Inclusive and Supportive Environment</span>
                </div>
                <div className="flex items-center">
                  <FaGraduationCap className="text-3xl text-yellow-500 mr-4" />
                  <span>Continuous Learning and Growth</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-800 p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-3xl font-semibold mb-6 text-left">Current Openings</h2>
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeJobIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-700 p-6 rounded-lg"
                  >
                    <h3 className="text-2xl font-semibold mb-3 flex items-center text-left">
                      <FaUtensils className="mr-3 text-yellow-500" />
                      {jobOpenings[activeJobIndex].title}
                    </h3>
                    <p className="text-gray-300 mb-4 text-left">{jobOpenings[activeJobIndex].description}</p>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold mb-2 text-left">Requirements:</h4>
                      <ul className="list-disc list-inside text-gray-300 text-left">
                        {jobOpenings[activeJobIndex].requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-left">Benefits:</h4>
                      <ul className="list-disc list-inside text-gray-300 text-left">
                        {jobOpenings[activeJobIndex].benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                    <Link to="#application-form" className="inline-block mt-4 text-yellow-500 hover:text-yellow-400 transition duration-300">
                      Apply Now →
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
          
          <div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8"
            >
              <img 
                src="https://www.shutterstock.com/image-photo/male-chef-garnishing-food-herb-600nw-2281290409.jpg" 
                alt="Chef garnishing food" 
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-gray-800 p-8 rounded-lg shadow-lg"
              id="application-form"
            >
              <h2 className="text-3xl font-semibold mb-6 text-left">Apply Now</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 text-left">Full Name</label>
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 text-left">Email</label>
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
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 text-left">Phone</label>
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
                  <label htmlFor="position" className="block text-sm font-medium text-gray-300 text-left">Position</label>
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
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-300 text-left">Resume</label>
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
                  <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-300 text-left">Cover Letter</label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows="4"
                    className="mt-1 block w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    placeholder="Tell us why you're perfect for this role..."
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-300 ease-in-out"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
