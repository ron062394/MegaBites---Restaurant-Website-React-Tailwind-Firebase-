import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header id='header' className="sticky top-0 w-full shadow-lg z-50 bg-white text-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/">
            <motion.div 
              className="text-2xl text-gray-800 tracking-wide"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <span className="italic font-bold relative text-shadow-md -top-2 bg-gray-900 text-white">Tonkotsu</span>
              <span className="italic font-bold text-shadow-md bg-white text-gray-800">Corner</span>
            </motion.div>
          </Link>

          <nav className="hidden md:flex space-x-6">
            {['Home', 'Menu', 'About Us', 'Contact Us', 'Careers'].map((item, index) => (
              <motion.div
                key={item}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="mx-2"
              >
                <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`} className="no-underline text-lg font-medium transition duration-300 hover:text-gray-600">
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Link to="/sign-in" className="hidden md:inline-block btn px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 border border-gray-600 font-bold mr-4 hover:bg-gray-100">
              Sign In
            </Link>
            <Link to="/register" className="hidden md:inline-block btn px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 bg-gray-900 font-bold text-white hover:bg-gray-800">
              Register
            </Link>
          </motion.div>

          <button
            className="md:hidden btn btn-link text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="bi bi-list" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 12a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm0-5a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm0 10a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1z"/>
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-3">
            {['Home', 'Menu', 'About Us', 'Contact Us', 'Careers'].map((item) => (
              <Link 
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                className="block py-2 no-underline text-lg font-medium transition duration-300 hover:text-gray-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link 
              to="/sign-in" 
              className="block mt-3 btn px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 text-center border border-gray-600 font-bold hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="block mt-3 btn px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 text-center bg-gray-900 font-bold text-white hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}

export default Header;