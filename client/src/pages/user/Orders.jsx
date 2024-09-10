import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaSort, FaShoppingBag } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { db } from '../../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching orders for user:', user.uid);
        const ordersRef = collection(db, 'Orders');
        const q = query(
          ordersRef,
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt ? new Date(data.createdAt) : new Date()
          };
        });
        setOrders(ordersData);
      } catch (err) {
        console.error('Error fetching orders:', err);
        if (err.code === 'permission-denied') {
          setError('You do not have permission to access these orders.');
          toast.error('Access denied. Please ensure you are logged in as a customer.');
        } else if (err.code === 'failed-precondition') {
          setError('This query requires a Firestore index. Please contact the administrator.');
          toast.error('Failed to load orders. An index is required.');
        } else {
          setError('Failed to load orders. Please try again.');
          toast.error('Failed to load orders. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedOrders = useMemo(() => {
    let sortableOrders = [...orders];
    if (sortConfig.key) {
      sortableOrders.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableOrders;
  }, [orders, sortConfig]);

  const filteredOrders = useMemo(() => 
    sortedOrders.filter(order =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
    ), [sortedOrders, searchTerm]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 bg-gray-50 rounded-lg shadow-md"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
        <FaShoppingBag className="mr-3 text-blue-600" />
        Your Orders
      </h2>
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full p-3 pl-12 pr-4 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300"
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
        </div>
      </div>
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-center items-center h-64"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </motion.div>
      ) : error ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-red-500 text-center py-4"
        >
          {error}
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-8"
        >
          {filteredOrders.map(order => (
            <motion.div
              key={order.id}
              className="bg-white shadow-md rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Order ID: {order.id}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <p className="text-gray-600 mb-2">Date: {order.createdAt instanceof Date && !isNaN(order.createdAt) ? order.createdAt.toLocaleString() : 'Invalid Date'}</p>
              <p className="text-gray-600 mb-4">Total: ${order.totalAmount.toFixed(2)}</p>
              <h4 className="text-lg font-semibold mb-2 text-gray-700">Items:</h4>
              <ul className="divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <li key={index} className="py-3 flex justify-between items-center">
                    <span className="font-medium text-gray-800">{item.name}</span>
                    <span className="text-gray-600">
                      Qty: {item.quantity} | ${item.price.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      )}
      <ToastContainer />
    </motion.div>
  );
};

export default Orders;
