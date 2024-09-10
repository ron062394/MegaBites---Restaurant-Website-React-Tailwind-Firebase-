import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaUser, FaSignInAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../components/utils/Logo';
import { useLogin } from '../../hooks/useLogin';


const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { login, isLoading, error } = useLogin();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData.email, formData.password);
      if (!error) {
        toast.success('Admin login successful');
        navigate('/admin');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred. Please try again.');
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const renderInputField = (id, label, icon, type = 'text') => (
    <div className="mb-4 relative">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </span>
        <input
          className="shadow appearance-none border rounded-full w-full py-3 pl-10 pr-3 text-gray-700 bg-white leading-tight focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300"
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
      <div className="w-full max-w-md">
        <motion.div
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <Logo />
              <h2 className="text-3xl font-bold text-gray-800 mt-6">Admin Login</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {renderInputField('email', 'Email address', <FaUser className="text-gray-500" />, 'email')}
              {renderInputField('password', 'Password', <FaLock className="text-gray-500" />, 'password')}
              
              {error && <p className="text-red-500 text-sm italic">{error}</p>}
              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 ease-in-out"
                  type="submit"
                  disabled={isLoading}
                >
                  <FaSignInAlt className="mr-2" />
                  <span>{isLoading ? 'Logging in...' : 'Sign In'}</span>
                </motion.button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <Link to="/" className="font-medium text-sm text-gray-600 hover:text-gray-500 transition duration-300">
                Back to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
