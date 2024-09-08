import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../utils/Logo';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { toast } from 'react-toastify';
import { FaShoppingCart } from 'react-icons/fa';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const fadeInUp = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Contact', path: '/contact' },
    { name: 'Careers', path: '/careers' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <header id='header' className="sticky top-0 w-full shadow-lg z-50 bg-gradient-to-r from-gray-900 to-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Logo />
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="mx-2"
              >
                <Link to={item.path} className="no-underline text-lg font-medium transition duration-300 hover:text-yellow-400">
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex items-center"
          >
            {user ? (
              <>
                <Link to="/cart" className="mr-4">
                  <FaShoppingCart className="text-2xl text-yellow-400 hover:text-yellow-500 transition duration-300" />
                </Link>
                <button onClick={handleLogout} className="hidden md:inline-block btn px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 border border-yellow-400 font-bold hover:bg-yellow-400 hover:text-gray-900">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/sign-in" className="hidden md:inline-block btn px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 border border-yellow-400 font-bold mr-4 hover:bg-yellow-400 hover:text-gray-900">
                  Sign In
                </Link>
                <Link to="/register" className="hidden md:inline-block btn px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 bg-yellow-400 font-bold text-gray-900 hover:bg-yellow-500">
                  Register
                </Link>
              </>
            )}
          </motion.div>

          <button
            className="md:hidden btn btn-link text-white"
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
          className="md:hidden bg-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-3">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className="block py-2 no-underline text-lg font-medium transition duration-300 hover:text-yellow-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link 
                  to="/cart" 
                  className="block py-2 no-underline text-lg font-medium transition duration-300 hover:text-yellow-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaShoppingCart className="inline mr-2" /> Cart
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block mt-3 btn px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 text-center border border-yellow-400 font-bold hover:bg-yellow-400 hover:text-gray-900 w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/sign-in" 
                  className="block mt-3 btn px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 text-center border border-yellow-400 font-bold hover:bg-yellow-400 hover:text-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="block mt-3 btn px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 text-center bg-yellow-400 font-bold text-gray-900 hover:bg-yellow-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
}

export default Header;