import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaHome, FaEdit, FaSave } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Orders from './Orders';

const Profile = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    phoneNumber: '',
    userAddress: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        navigate('/signin');
        return;
      }

      try {
        const userRef = doc(db, 'Customer', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          toast.info('Please complete your profile');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userRef = doc(db, 'Customer', user.uid);
      await setDoc(userRef, {
        ...userData,
        userId: user.uid
      }, { merge: true });
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return <div className="text-center text-white text-2xl mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-black">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <motion.div
        className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="p-8">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">Your Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaUser className="text-gray-500" />
                </span>
                <input
                  className="shadow appearance-none border rounded-full w-full py-3 pl-10 pr-3 text-gray-700 bg-white leading-tight focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300"
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={userData.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaPhone className="text-gray-500" />
                </span>
                <input
                  className="shadow appearance-none border rounded-full w-full py-3 pl-10 pr-3 text-gray-700 bg-white leading-tight focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300"
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={userData.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userAddress">
                Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaHome className="text-gray-500" />
                </span>
                <input
                  className="shadow appearance-none border rounded-full w-full py-3 pl-10 pr-3 text-gray-700 bg-white leading-tight focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300"
                  id="userAddress"
                  name="userAddress"
                  type="text"
                  placeholder="Enter your address"
                  value={userData.userAddress}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              {!isEditing ? (
                <motion.button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <FaEdit className="mr-2" /> Edit Profile
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <FaSave className="mr-2" /> Save Changes
                </motion.button>
              )}
            </div>
          </form>
        </div>
        <Orders />
      </motion.div>
    </div>
  );
};

export default Profile;

