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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, 'Orders');
        const q = query(ordersRef, orderBy('createdAt', 'desc'));
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
        updateDailySummary(ordersData);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again.');
        toast.error('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
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
        console.log(customersData);
      } catch (err) {
        console.error('Error fetching customers:', err);
        toast.error('Failed to load customers. Please try again.');
      }
    };

    fetchOrders();
    fetchCustomers();
  }, []);

  const updateDailySummary = async (ordersData) => {
    const today = new Date().toISOString().split('T')[0];
    const dailySummaryRef = doc(db, 'DailySummary', today);

    try {
      const dailySummarySnap = await getDoc(dailySummaryRef);
      let dailySummary;
      if (dailySummarySnap.exists()) {
        dailySummary = dailySummarySnap.data();
      } else {
        dailySummary = {
          date: today,
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
      console.log('ordersData', ordersData);
      ordersData.forEach(order => {
        if (order.createdAt.toISOString().split('T')[0] === today && 
            !dailySummary.orders.includes(order.id) && 
            order.status === 'Completed') {
          dailySummary.orders.push(order.id);
          dailySummary.totalSales += order.totalAmount;
          dailySummary.totalOrdersQty += 1;
          console.log('order', order);
          console.log('order items', order.items);
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
        }
      });

      console.log('Updated Daily Summary:', dailySummary);

      dailySummary.updatedAt = new Date().toISOString();
      await setDoc(dailySummaryRef, dailySummary);
    } catch (error) {
      console.error('Error updating daily summary:', error);
    }
  };

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
        updateDailySummary(updatedOrders);
      }
      toast.success(`Order status updated to ${newStatus}`);
    } catch (err) {
      console.error('Error updating order status:', err);
      toast.error('Failed to update order status');
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-lg"
    >
      <h2 className="text-4xl font-bold mb-8 text-gray-800 flex items-center justify-start">
        <FaShoppingBag className="mr-4 text-blue-600" />
        Order Management
      </h2>
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full p-4 pl-12 pr-4 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 text-lg"
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className="absolute left-4 top-4 text-gray-400 text-xl" />
        </div>
      </div>
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-center items-center h-64"
        >
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>
        </motion.div>
      ) : error ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-red-500 text-center py-4 text-xl"
        >
          {error}
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="overflow-x-auto bg-white rounded-lg shadow-xl"
        >
          <table className="min-w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                {['Order ID', 'Customer', 'Contact', 'Date', 'Total', 'Status', 'Actions'].map((header, index) => (
                  <th key={index} className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    {header}
                    <button onClick={() => handleSort(header.toLowerCase())} className="ml-2 focus:outline-none">
                      <FaSort className="inline" />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {filteredOrders.map((order) => {
                  const customer = customers.find(customer => customer.userId === order.userId);
                  const isExpanded = expandedOrderId === order.id;
                  return (
                    <React.Fragment key={order.id}>
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                        onClick={() => toggleOrderDetails(order.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-left">
                          {order.id.substring(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-left">{customer ? customer.fullName : 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-left">{customer ? customer.phoneNumber : 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-left">{order.createdAt.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600 text-left">${order.totalAmount.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-left">
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                            className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            {['Pending', 'Processing', 'Completed', 'Cancelled'].map((status) => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-left">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteOrder(order.id);
                            }}
                            className="text-red-600 hover:text-red-900 mr-4 transition-colors duration-200"
                          >
                            <FaTrash className="inline mr-1" /> Delete
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              /* Implement edit functionality */
                            }}
                            className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                          >
                            <FaEdit className="inline mr-1" /> Edit
                          </button>
                          {isExpanded ? <FaChevronUp className="inline ml-2" /> : <FaChevronDown className="inline ml-2" />}
                        </td>
                      </motion.tr>
                      {isExpanded && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <td colSpan="7" className="px-6 py-4 bg-gray-50">
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
        </motion.div>
      )}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </motion.div>
  );
};

export default Orders;
