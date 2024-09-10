import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaSort, FaShoppingBag, FaEdit, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../firebase';
import { collection, query, getDocs, orderBy, updateDoc, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersRef = collection(db, 'Orders');
      const q = query(ordersRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt ? new Date(doc.data().createdAt) : new Date()
      }));
      setOrders(ordersData);
      updateDailySummary(ordersData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to fetch orders');
      setLoading(false);
      toast.error('Failed to fetch orders. Please try again.');
    }
  };

  const fetchCustomers = async () => {
    try {
      const customersRef = collection(db, 'Customer');
      const querySnapshot = await getDocs(customersRef);
      const customersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(customersData);
    } catch (err) {
      console.error('Error fetching customers:', err);
      toast.error('Failed to fetch customers. Please try again.');
    }
  };

  const updateDailySummary = async (ordersData) => {
    try {
      for (const order of ordersData) {
        const orderDate = order.createdAt.toISOString().split('T')[0];
        console.log(orderDate);
        const dailySummaryRef = doc(db, 'DailySummary', orderDate);
        const dailySummarySnap = await getDoc(dailySummaryRef);

        let dailySummary;
        if (dailySummarySnap.exists()) {
          dailySummary = dailySummarySnap.data();
        } else {
          dailySummary = {
            date: orderDate,
            orders: [],
            totalSales: 0,
            totalOrdersQty: 0,
            totalRamenQty: 0,
            totalAppetizersQty: 0,
            totalSideDishesQty: 0,
            totalDessertsQty: 0,
            totalDrinksQty: 0,
            updatedAt: new Date().toISOString()
          };
        }

        if (!dailySummary.orders.includes(order.id) && order.status === 'Completed') {
          dailySummary.orders.push(order.id);
          dailySummary.totalSales += order.totalAmount;
          dailySummary.totalOrdersQty += 1;
          order.items.forEach(item => {
            switch(item.category) {
              case 'Ramen':
                dailySummary.totalRamenQty += parseInt(item.quantity);
                break;
              case 'Appetizers':
                dailySummary.totalAppetizersQty += parseInt(item.quantity);
                break;
              case 'Side Dishes':
                dailySummary.totalSideDishesQty += parseInt(item.quantity);
                break;
              case 'Desserts':
                dailySummary.totalDessertsQty += parseInt(item.quantity);
                break;
              case 'Drinks':
                dailySummary.totalDrinksQty += parseInt(item.quantity);
                break;
              default:
                console.warn(`Unknown category: ${item.category}`);
            }
          });

          dailySummary.updatedAt = new Date().toISOString();
          await setDoc(dailySummaryRef, dailySummary);
        }
      }
    } catch (error) {
      console.error('Error updating daily summaries:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedOrders = useMemo(() => {
    let sortableOrders = [...orders];
    if (sortConfig.key !== null) {
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
    sortedOrders.filter(order => {
      const customer = customers.find(customer => customer.userId === order.userId);
      return (
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (customer && customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }), [sortedOrders, searchTerm, customers]);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const orderRef = doc(db, 'Orders', id);
      await updateDoc(orderRef, { 
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
      const updatedOrders = orders.map(order => 
        order.id === id ? { ...order, status: newStatus, updatedAt: new Date() } : order
      );
      setOrders(updatedOrders);
      if (newStatus === 'Completed') {
        updateDailySummary([updatedOrders.find(order => order.id === id)]);
      }
      toast.success(`Order status updated to ${newStatus}`);
    } catch (err) {
      console.error('Error updating order status:', err);
      toast.error('Failed to update order status');
    }
  };

  const handleDeleteOrder = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'Orders', id));
        setOrders(orders.filter(order => order.id !== id));
        toast.success('Order deleted successfully');
      } catch (err) {
        console.error('Error deleting order:', err);
        toast.error('Failed to delete order');
      }
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Cancelled':
        return 'bg-red-500';
      case 'Completed':
        return 'bg-green-500';
      case 'Pending':
        return 'bg-yellow-500';
      case 'Processing':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) return <div className="text-center text-2xl text-gray-800">Loading...</div>;
  if (error) return <div className="text-center text-2xl text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <motion.h1
        className="text-4xl font-bold mb-6 text-gray-800 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        Order Management
      </motion.h1>
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center mb-6"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            className="pl-10 pr-4 py-3 rounded-full shadow appearance-none border w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </motion.div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-800">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 cursor-pointer" onClick={() => requestSort('id')}>
                Order ID {sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th className="p-3 cursor-pointer" onClick={() => requestSort('userId')}>
                Customer {sortConfig.key === 'userId' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th className="p-3">Contact</th>
              <th className="p-3 cursor-pointer" onClick={() => requestSort('createdAt')}>
                Date {sortConfig.key === 'createdAt' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th className="p-3 cursor-pointer" onClick={() => requestSort('totalAmount')}>
                Total {sortConfig.key === 'totalAmount' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th className="p-3 cursor-pointer" onClick={() => requestSort('status')}>
                Status {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredOrders.map((order) => {
                const customer = customers.find(customer => customer.userId === order.userId);
                const isExpanded = expandedOrderId === order.id;
                return (
                  <React.Fragment key={order.id}>
                    <motion.tr
                      className="border-b border-gray-200 hover:bg-gray-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="p-3">{order.id.substring(0, 8)}...</td>
                      <td className="p-3">{customer ? customer.fullName : 'N/A'}</td>
                      <td className="p-3">{customer ? customer.phoneNumber : 'N/A'}</td>
                      <td className="p-3">{order.createdAt.toLocaleString()}</td>
                      <td className="p-3">${order.totalAmount.toFixed(2)}</td>
                      <td className="p-3">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                          className={`${getStatusColor(order.status)} text-white px-4 py-2 rounded-full mr-2 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 shadow-lg`}
                        >
                          {['Pending', 'Processing', 'Completed', 'Cancelled'].map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-3">
                        <motion.button
                          className="bg-gray-700 text-white px-4 py-2 rounded-full mr-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 shadow-lg"
                          onClick={() => toggleOrderDetails(order.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isExpanded ? <FaChevronUp className="inline mr-2" /> : <FaChevronDown className="inline mr-2" />}
                          Details
                        </motion.button>
                        <motion.button
                          className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 shadow-lg"
                          onClick={() => handleDeleteOrder(order.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaTrash className="inline mr-2" /> Delete
                        </motion.button>
                      </td>
                    </motion.tr>
                    {isExpanded && (
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td colSpan="7" className="p-3 bg-gray-50">
                          <h4 className="text-lg font-semibold mb-2">Order Details</h4>
                          <ul>
                            {order.items.map((item, index) => (
                              <li key={index} className="mb-1">
                                {item.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
                              </li>
                            ))}
                          </ul>
                          <p className="mt-2"><strong>Shipping Address:</strong> {order.shippingAddress.address}</p>
                        </td>
                      </motion.tr>
                    )}
                  </React.Fragment>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default Orders;
