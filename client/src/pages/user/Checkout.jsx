import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaCreditCard, FaPlus, FaLock, FaMoneyBillWave, FaHandshake, FaUser, FaEnvelope, FaPhone, FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [useSavedAddress, setUseSavedAddress] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [savedAddress, setSavedAddress] = useState({});

  const navigate = useNavigate();
  const { user } = useAuthContext();
  const stripe = useStripe();
  const elements = useElements();

  const fetchCartItems = useCallback(async () => {
    if (!user) {
      navigate('/signin');
      return;
    }

    try {
      setLoading(true);
      const cartRef = doc(db, 'Cart', user.uid);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const cartData = cartSnap.data();
        setCartItems(cartData.items || []);
        // Calculate total here
        const calculatedTotal = (cartData.items || []).reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotal(calculatedTotal);
        console.log(calculatedTotal);
      } else {
        setCartItems([]);
        setTotal(0);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast.error('Failed to load cart items. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user, navigate]);

  const fetchUserProfile = useCallback(async () => {
    if (!user) return;

    try {
      const userRef = doc(db, 'Customer', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setSavedAddress({
          name: userData.fullName,
          email: user.email,
          phone: userData.phoneNumber,
          address: userData.userAddress,
        });
        // Set the payment method if it exists in the user data
        if (userData.preferredPaymentMethod) {
          setPaymentMethod(userData.preferredPaymentMethod);
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('Failed to load user profile. Please try again.');
    }
  }, [user]);

  useEffect(() => {
    fetchCartItems();
    fetchUserProfile();
  }, [fetchCartItems, fetchUserProfile]);

  useEffect(() => {
    if (useSavedAddress) {
      setFormData(prevState => ({
        ...prevState,
        ...savedAddress
      }));
    }
  }, [useSavedAddress, savedAddress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to place an order.');
      return;
    }

    if (!stripe || !elements) {
      toast.error('Stripe has not been initialized.');
      return;
    }

    try {
      let paymentMethodId = null;

      if (paymentMethod === 'credit_card') {
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
          toast.error('Card element not found. Please refresh the page and try again.');
          return;
        }

        const { error, paymentMethod: stripePaymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

        if (error) {
          console.error('Error creating payment method:', error);
          toast.error('Payment failed. Please check your card details and try again.');
          return;
        }

        paymentMethodId = stripePaymentMethod.id;
      }

      // Create order in Firestore
      const orderRef = doc(db, 'Orders', `${user.uid}_${Date.now()}`);
      await setDoc(orderRef, {
        userId: user.uid,
        items: cartItems,
        totalAmount: total,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        shippingAddress: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        },
        paymentMethod: paymentMethod,
        paymentMethodId: paymentMethodId,
      });

      // Delete cart
      const cartRef = doc(db, 'Cart', user.uid);
      await deleteDoc(cartRef);

      // Save payment method to user profile
      const userRef = doc(db, 'Customer', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        await updateDoc(userRef, {
          preferredPaymentMethod: paymentMethod
        });
      } else {
        // If the Customer document doesn't exist, create it
        await setDoc(userRef, {
          fullName: formData.name,
          phoneNumber: formData.phone,
          userAddress: formData.address,
          preferredPaymentMethod: paymentMethod
        });
      }

      toast.success('Order placed successfully!');
      setTimeout(() => {
        navigate(`/order-successful/${orderRef.id}`);
      }, 500);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <Link to="/cart" className="flex items-center text-gray-300 hover:text-white mb-8 transition duration-300">
          <FaArrowLeft className="mr-2" />
          Back to Cart
        </Link>
        <motion.h1
          className="text-5xl font-bold mb-12 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          Checkout
        </motion.h1>
        {loading ? (
          <motion.div
            className="flex justify-center items-center h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="bg-gray-800 rounded-lg shadow-xl p-8"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-semibold mb-6">Order Summary</h2>
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.itemId}
                    className="flex justify-between items-center mb-4 bg-gray-700 p-4 rounded-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="font-medium">{item.name} x {item.quantity}</span>
                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="border-t border-gray-600 pt-6 mt-6">
                <div className="flex justify-between items-center font-bold text-xl">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="bg-gray-800 rounded-lg shadow-xl p-8"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-semibold mb-6">Delivery Details</h2>
              <div className="mb-6">
                <label className="flex items-center text-lg">
                  <input
                    type="checkbox"
                    checked={useSavedAddress}
                    onChange={() => setUseSavedAddress(!useSavedAddress)}
                    className="mr-3 form-checkbox h-5 w-5 text-blue-600"
                  />
                  Use saved address and contact
                </label>
              </div>
              {!useSavedAddress && (
                <motion.button
                  onClick={() => setUseSavedAddress(true)}
                  className="mb-6 flex items-center text-blue-400 hover:text-blue-300 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlus className="mr-2" /> Use saved address
                </motion.button>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 text-lg">Name</label>
                  <div className="relative">
                    <FaUser className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-10 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-lg">Email</label>
                  <div className="relative">
                    <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-10 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-lg">Phone</label>
                  <div className="relative">
                    <FaPhone className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-10 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-lg">Address</label>
                  <div className="relative">
                    <FaHome className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-10 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <h2 className="text-3xl font-semibold mb-6 mt-12">Payment Method</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <motion.button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`flex items-center justify-center px-4 py-3 rounded-lg text-lg font-medium transition duration-300 ${
                      paymentMethod === 'credit_card' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaCreditCard className="mr-2" />
                    Credit Card
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setPaymentMethod('cop')}
                    className={`flex items-center justify-center px-4 py-3 rounded-lg text-lg font-medium transition duration-300 ${
                      paymentMethod === 'cop' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaMoneyBillWave className="mr-2" />
                    Cash on Pickup
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-center justify-center px-4 py-3 rounded-lg text-lg font-medium transition duration-300 ${
                      paymentMethod === 'cod' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaHandshake className="mr-2" />
                    Cash on Delivery
                  </motion.button>
                </div>
                {paymentMethod === 'credit_card' && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block mb-2 text-lg">Card Details</label>
                        <CardElement className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
                <motion.button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLock className="mr-2" />
                  Place Order Securely
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
