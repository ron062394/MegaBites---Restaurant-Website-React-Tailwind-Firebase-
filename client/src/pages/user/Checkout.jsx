import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaCreditCard, FaPaypal, FaPlus, FaLock, FaMoneyBillWave, FaHandshake } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [savedAddress, setSavedAddress] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Main St',
    city: 'Anytown',
    zipCode: '12345',
  });

  const navigate = useNavigate();

  const fetchCartItems = useCallback(async () => {
    try {
      setLoading(true);
      // Simulating API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockCartItems = [
        { id: 1, name: 'Classic Tonkotsu Ramen', price: 14.99, quantity: 2 },
        { id: 2, name: 'Spicy Miso Ramen', price: 15.99, quantity: 1 },
        { id: 3, name: 'Gyoza (6 pcs)', price: 6.99, quantity: 1 },
      ];
      setCartItems(mockCartItems);
      const newTotal = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotal(newTotal);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast.error('Failed to load cart items. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

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
    try {
      // Simulating API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Order placed successfully!');
      setTimeout(() => {
        navigate('/order-confirmation');
      }, 2000);
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
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <Link to="/cart" className="flex items-center text-gray-300 hover:text-white mb-8">
          <FaArrowLeft className="mr-2" />
          Back to Cart
        </Link>
        <motion.h1
          className="text-4xl font-bold mb-8"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white bg-opacity-10 rounded-lg shadow-lg p-6"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex justify-between items-center mb-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="border-t border-gray-600 pt-4 mt-4">
                <div className="flex justify-between items-center font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="bg-white bg-opacity-10 rounded-lg shadow-lg p-6"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-semibold mb-4">Delivery Address and Contact</h2>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={useSavedAddress}
                    onChange={() => setUseSavedAddress(!useSavedAddress)}
                    className="mr-2"
                  />
                  Use saved address and contact
                </label>
              </div>
              {!useSavedAddress && (
                <motion.button
                  onClick={() => setUseSavedAddress(true)}
                  className="mb-4 flex items-center text-blue-400 hover:text-blue-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlus className="mr-2" /> Use saved address
                </motion.button>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800 rounded-md"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-800 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-800 rounded-md"
                      required
                    />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
                <div className="mb-4">
                  <label className="block mb-2">Payment Method</label>
                  <div className="flex flex-wrap space-x-4">
                    <motion.button
                      type="button"
                      onClick={() => setPaymentMethod('credit_card')}
                      className={`flex items-center px-4 py-2 rounded-md mb-2 ${
                        paymentMethod === 'credit_card' ? 'bg-gray-700' : 'bg-gray-800'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaCreditCard className="mr-2" />
                      Credit Card
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`flex items-center px-4 py-2 rounded-md mb-2 ${
                        paymentMethod === 'paypal' ? 'bg-gray-700' : 'bg-gray-800'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaPaypal className="mr-2" />
                      PayPal
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => setPaymentMethod('cop')}
                      className={`flex items-center px-4 py-2 rounded-md mb-2 ${
                        paymentMethod === 'cop' ? 'bg-gray-700' : 'bg-gray-800'
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
                      className={`flex items-center px-4 py-2 rounded-md mb-2 ${
                        paymentMethod === 'cod' ? 'bg-gray-700' : 'bg-gray-800'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaHandshake className="mr-2" />
                      Cash on Delivery
                    </motion.button>
                  </div>
                </div>
                {paymentMethod === 'credit_card' && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-4">
                        <label className="block mb-2">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-800 rounded-md"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block mb-2">Expiry Date</label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 bg-gray-800 rounded-md"
                            required
                          />
                        </div>
                        <div>
                          <label className="block mb-2">CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-gray-800 rounded-md"
                            required
                          />
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
                <motion.button
                  type="submit"
                  className="w-full bg-gray-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-700 transition duration-300 flex items-center justify-center"
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
