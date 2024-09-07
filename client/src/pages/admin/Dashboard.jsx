import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaUtensils, FaClipboardList, FaChartLine, FaTachometerAlt, FaList, FaCog, FaSignOutAlt, FaBell, FaShoppingCart, FaDollarSign } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Reports from '../../components/admin/Reports';
import Reservations from '../../components/admin/Reservations';
import MenuItems from '../../components/admin/MenuItems';
import Orders from '../../components/admin/Orders';
import Users from '../../components/admin/Users';
import Notifications from '../../components/admin/Notifications';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalMenuItems: 0,
    revenue: 0,
    todaySales: 0,
    todayOrders: 0
  });
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch dashboard stats from API
    // This is a placeholder. Replace with actual API call
    const fetchStats = async () => {
      // Simulating API call with setTimeout
      setTimeout(() => {
        setStats({
          totalUsers: 1250,
          totalOrders: 5678,
          totalMenuItems: 42,
          revenue: 98765,
          todaySales: 2500,
          todayOrders: 75
        });
      }, 1000);
    };

    fetchStats();

    // Fetch notifications
    const fetchNotifications = async () => {
      // Simulating API call with setTimeout
      setTimeout(() => {
        setNotifications([
          { id: 1, message: 'New order received', time: '5 minutes ago' },
          { id: 2, message: 'New user registered', time: '1 hour ago' },
          { id: 3, message: 'Daily report ready', time: '2 hours ago' },
        ]);
      }, 1000);
    };

    fetchNotifications();

    // Fetch sales data for chart
    const fetchSalesData = async () => {
      // Simulating API call with setTimeout
      setTimeout(() => {
        setSalesData([
          { name: '00:00', sales: 1000 },
          { name: '04:00', sales: 1500 },
          { name: '08:00', sales: 2000 },
          { name: '12:00', sales: 2500 },
          { name: '16:00', sales: 3000 },
          { name: '20:00', sales: 3500 },
        ]);
      }, 1000);
    };

    fetchSalesData();
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const StatCard = ({ title, value, icon }) => (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md"
      variants={fadeInUp}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="text-4xl text-gray-400">{icon}</div>
      </div>
    </motion.div>
  );

  const handleLogout = () => {
    // Implement logout logic here
    // For example, clear local storage, reset state, etc.
    // Then navigate to login page
    navigate('/login');
  };

  const Sidebar = () => (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <button onClick={() => setActiveComponent('dashboard')} className="flex items-center text-gray-300 hover:text-white">
                <FaTachometerAlt className="mr-2" />
                Dashboard
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => setActiveComponent('orders')} className="flex items-center text-gray-300 hover:text-white">
                <FaClipboardList className="mr-2" />
                Orders
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => setActiveComponent('menu')} className="flex items-center text-gray-300 hover:text-white">
                <FaList className="mr-2" />
                Menu Items
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => setActiveComponent('users')} className="flex items-center text-gray-300 hover:text-white">
                <FaUsers className="mr-2" />
                Users
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => setActiveComponent('reports')} className="flex items-center text-gray-300 hover:text-white">
                <FaChartLine className="mr-2" />
                Reports
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => setActiveComponent('reservations')} className="flex items-center text-gray-300 hover:text-white">
                <FaUtensils className="mr-2" />
                Reservations
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => setActiveComponent('notifications')} className="flex items-center text-gray-300 hover:text-white">
                <FaBell className="mr-2" />
                Notifications
                {notifications.length > 0 && (
                  <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs ml-2">
                    {notifications.length}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <button onClick={handleLogout} className="flex items-center text-gray-300 hover:text-white mt-auto">
        <FaSignOutAlt className="mr-2" />
        Logout
      </button>
    </div>
  );

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return (
          <>
            <motion.h1
              className="text-3xl font-bold text-gray-800 mb-8"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              Admin Dashboard
            </motion.h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard title="Total Users" value={stats.totalUsers} icon={<FaUsers />} />
              <StatCard title="Total Orders" value={stats.totalOrders} icon={<FaClipboardList />} />
              <StatCard title="Menu Items" value={stats.totalMenuItems} icon={<FaUtensils />} />
              <StatCard title="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} icon={<FaChartLine />} />
              <StatCard title="Today's Sales" value={`$${stats.todaySales.toLocaleString()}`} icon={<FaDollarSign />} />
              <StatCard title="Today's Orders" value={stats.todayOrders} icon={<FaShoppingCart />} />
            </div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md mb-8"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-bold mb-4">Today's Sales Chart</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
            <motion.div
              className="mt-8"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-bold mb-4">Recent Notifications</h2>
              <Notifications notifications={notifications.slice(0, 3)} />
            </motion.div>
          </>
        );
      case 'orders':
        return <Orders />;
      case 'menu':
        return <MenuItems />;
      case 'users':
        return <Users />;
      case 'reports':
        return <Reports />;
      case 'reservations':
        return <Reservations />;
      case 'notifications':
        return <Notifications notifications={notifications} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
