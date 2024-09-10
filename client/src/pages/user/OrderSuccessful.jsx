import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaHome, FaClipboardList, FaReceipt, FaUtensils, FaTruck } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuthContext } from '../../hooks/useAuthContext';

const OrderSuccessful = () => {
  const [orderSummary, setOrderSummary] = useState(null);
  const { id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!user || !id) return;

      try {
        const orderRef = doc(db, 'Orders', id);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          const orderData = orderSnap.data();
          setOrderSummary({
            totalAmount: orderData.totalAmount,
            items: orderData.items,
            status: orderData.status,
            createdAt: orderData.createdAt,
          });
        } else {
          console.log('No such order!');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [user, id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-2xl text-center max-w-2xl w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <FaCheckCircle className="text-7xl text-green-400 mx-auto mb-6" />
        </motion.div>
        <h1 className="text-4xl font-bold mb-4 text-green-300">Order Successful!</h1>
        <p className="text-xl mb-4 text-gray-300">Thank you for your order. Your ramen is on its way!</p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-700 p-4 rounded-lg mb-6"
        >
          <p className="text-lg flex items-center justify-center">
            <FaReceipt className="mr-2 text-yellow-400" />
            Order Reference: <span className="font-semibold ml-2 text-yellow-300 break-all">{id}</span>
          </p>
        </motion.div>
        {orderSummary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-6 bg-gray-700 p-6 rounded-lg shadow-inner"
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center text-blue-300">
              <FaUtensils className="mr-2" />
              Order Summary
            </h2>
            <ul className="text-left space-y-2">
              {orderSummary.items.map((item, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-600 p-2 rounded">
                  <span>{item.quantity}x {item.name}</span>
                  <span className="font-semibold text-green-300">${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t-2 border-gray-600 mt-4 pt-4 flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span className="text-green-300">${orderSummary.totalAmount.toFixed(2)}</span>
            </div>
          </motion.div>
        )}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            >
              <FaHome className="mr-2" />
              Back to Home
            </motion.button>
          </Link>
          <Link to="/profile">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition duration-300 flex items-center justify-center"
            >
              <FaClipboardList className="mr-2" />
              View Orders
            </motion.button>
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-gray-400 flex items-center justify-center"
        >
          <FaTruck className="mr-2" />
          <span>Estimated delivery time: 30-45 minutes</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderSuccessful;
