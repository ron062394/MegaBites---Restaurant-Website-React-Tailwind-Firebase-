import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      // Mock data
      const mockNotifications = [
        { id: 1, message: 'New order received', time: '5 minutes ago' },
        { id: 2, message: 'New user registered', time: '1 hour ago' },
        { id: 3, message: 'Daily report ready', time: '2 hours ago' },
        { id: 4, message: 'Menu item out of stock', time: '3 hours ago' },
        { id: 5, message: 'New review posted', time: '1 day ago' },
      ];
      setNotifications(mockNotifications);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch notifications');
      setLoading(false);
    }
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast.success('Notification deleted successfully');
  };

  if (loading) return <div>Loading notifications...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications at this time.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <motion.li
              key={notification.id}
              variants={fadeInUp}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{notification.message}</p>
                <p className="text-sm text-gray-500">{notification.time}</p>
              </div>
              <button
                onClick={() => handleDeleteNotification(notification.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </motion.li>
          ))}
        </ul>
      )}
      <ToastContainer position="bottom-right" />
    </motion.div>
  );
};

export default Notifications;
