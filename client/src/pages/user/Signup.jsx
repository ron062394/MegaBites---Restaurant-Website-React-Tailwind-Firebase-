import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaEnvelope, FaUserPlus, FaGoogle, FaFacebook } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../components/utils/Logo';
import { useSignup } from '../../hooks/useSignup';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup, signupWithGoogle, signupWithFacebook, isLoading, error: signupError } = useSignup();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    try {
      await signup(formData.email, formData.password);
      if (signupError) {
        setError(signupError);
        toast.error(signupError);
        return;
      }
      toast.success('Account created successfully');
      navigate('/');
    } catch (error) {
      setError('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signupWithGoogle();
      if (signupError) {
        setError(signupError);
        toast.error(signupError);
        return;
      } 
      toast.success('Account created successfully');
      navigate('/');
    } catch (error) {
      setError('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleFacebookSignup = async () => {
    try {
      await signupWithFacebook();
      if (signupError) {
        setError(signupError);
        toast.error(signupError);
        return;
      } 
      toast.success('Account created successfully');
      navigate('/');
    } catch (error) {
      setError('An error occurred. Please try again.');
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
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-black"
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="w-full max-w-5xl">
        <motion.div
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
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
                <h2 className="text-5xl font-bold mb-8">Join Our Community</h2>
                <p className="mb-10 text-xl leading-relaxed">Sign up to become a part of Tonkotsu Corner! Create your account to enjoy our delicious ramen and explore our menu. Your culinary journey starts here!</p>
                <div className="mt-10">
                  <Link to="/menu" className="bg-gray-800 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-700 transition duration-300 shadow-lg">
                    Explore Menu
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side - Sign Up Form */}
            <div className="md:w-1/2 p-12 bg-white">
              <h2 className="text-4xl font-bold mb-10 text-gray-800 text-center">
                Create Account
              </h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                {renderInputField('email', 'Email address', <FaEnvelope className="text-gray-500" />, 'email')}
                {renderInputField('password', 'Password', <FaLock className="text-gray-500" />, 'password')}
                {renderInputField('confirmPassword', 'Confirm Password', <FaLock className="text-gray-500" />, 'password')}
                
                {error && <p className="text-red-500 text-sm italic">{error}</p>}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full justify-center py-2 px-4 border border-transparent rounded-full shadow-lg text-lg font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 ease-in-out"
                  type="submit"
                  disabled={isLoading}
                >
                  <FaUserPlus className="mr-3 inline" />
                  <span>{isLoading ? 'Signing Up...' : 'Sign Up'}</span>
                </motion.button>
              </form>

              <div className="mt-10">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 text-lg">
                      Or sign up with
                    </span>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <motion.button 
                    className="w-full inline-flex justify-center py-3 px-5 border border-gray-300 rounded-full shadow-sm bg-white text-lg font-medium text-gray-500 hover:bg-gray-50 transition duration-300 ease-in-out"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGoogleSignup}
                  >
                    <FaGoogle className="w-6 h-6" />
                    <span className="ml-3">Sign up with Google</span>
                  </motion.button>
                  <motion.button 
                    className="w-full inline-flex justify-center py-3 px-5 border border-gray-300 rounded-full shadow-sm bg-white text-lg font-medium text-gray-500 hover:bg-gray-50 transition duration-300 ease-in-out"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleFacebookSignup}
                  >
                    <FaFacebook className="w-6 h-6" />
                    <span className="ml-3">Sign up with Facebook</span>
                  </motion.button>
                </div>
              </div>

              <div className="mt-10">
                <div className="text-center">
                  <Link to="/sign-in" className="font-medium text-lg text-gray-600 hover:text-gray-500 transition duration-300">
                    Already have an account? Sign in
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

export default Signup;
