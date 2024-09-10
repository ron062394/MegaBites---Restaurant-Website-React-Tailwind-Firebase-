import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock, FaUser, FaSignInAlt, FaFacebook, FaGoogle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../components/utils/Logo';
import { useLogin } from '../../hooks/useLogin';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { login, loginWithGoogle, loginWithFacebook, isLoading, error } = useLogin();

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
        toast.success('Login successful');
        navigate('/');
      } else {
        toast.error(error);
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      if (!error) {
        toast.success('Login successful');
        navigate('/');
      } else {
        toast.error(error);
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await loginWithFacebook();
      if (!error) {
        toast.success('Login successful');
        navigate('/');
      } else {
        toast.error(error);
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
      <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </span>
        <input
          className="shadow appearance-none border rounded-full w-full py-3 pl-10 pr-3 text-gray-300 bg-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
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
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-black"
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="w-full max-w-5xl">
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
                  backgroundImage: "url('https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp')",
                  filter: "brightness(0.3)"
                }}
              ></div>
              <div className="text-white relative z-10 text-center">
                <Logo />

                <h2 className="text-5xl font-bold mb-8">Welcome Back</h2>
                <p className="mb-10 text-xl leading-relaxed">Welcome back to Tonkotsu Corner! Sign in to enjoy our delicious ramen and explore our menu. Your next bowl of comfort awaits!</p>
                <div className="mt-10">
                  <Link to="/menu" className="bg-yellow-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition duration-300 shadow-lg">
                    Explore Menu
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side - Sign In Form */}
            <div className="md:w-1/2 p-12 bg-gray-800">
              <h2 className="text-4xl font-bold mb-10 text-white text-center">
                Sign In
              </h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                {renderInputField('email', 'Email address', <FaUser className="text-gray-400" />, 'email')}
                {renderInputField('password', 'Password', <FaLock className="text-gray-400" />, 'password')}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-5 w-5 text-yellow-500 focus:ring-yellow-400 border-gray-600 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-yellow-500 hover:text-yellow-400 transition duration-300">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                
                {error && <p className="text-red-500 text-sm italic">{error}</p>}
                <div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex justify-center py-4 px-6 border border-transparent rounded-full shadow-lg text-lg font-medium text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition duration-300 ease-in-out"
                    type="submit"
                    disabled={isLoading}
                  >
                    <FaSignInAlt className="mr-3" />
                    <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
                  </motion.button>
                </div>
              </form>

              <div className="mt-10">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gray-800 text-gray-300 text-lg">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[FaFacebook, FaGoogle].map((Icon, index) => (
                    <motion.button 
                      key={index} 
                      className="w-full inline-flex justify-center py-3 px-5 border border-gray-600 rounded-full shadow-sm bg-gray-700 text-lg font-medium text-gray-300 hover:bg-gray-600 transition duration-300 ease-in-out"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={index === 0 ? handleFacebookLogin : handleGoogleLogin}
                      disabled={isLoading}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <div className="text-center">
                  <Link to="/register" className="font-medium text-lg text-yellow-500 hover:text-yellow-400 transition duration-300">
                    Don't have an account? Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signin;
