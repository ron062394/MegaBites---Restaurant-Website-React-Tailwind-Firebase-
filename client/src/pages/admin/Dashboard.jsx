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
            {[
              { name: 'Dashboard', icon: FaTachometerAlt, component: 'dashboard' },
              { name: 'Orders', icon: FaClipboardList, component: 'orders' },
              { name: 'Menu Items', icon: FaList, component: 'menu' },
              { name: 'Users', icon: FaUsers, component: 'users' },
              { name: 'Reports', icon: FaChartLine, component: 'reports' },
              { name: 'Reservations', icon: FaUtensils, component: 'reservations' },
              { name: 'Notifications', icon: FaBell, component: 'notifications' },
            ].map((item) => (
              <li key={item.name} className="mb-4">
                <button 
                  onClick={() => setActiveComponent(item.component)} 
                  className={`flex items-center text-gray-300 hover:text-white transition-colors duration-200 ${activeComponent === item.component ? 'text-white' : ''}`}
                >
                  <item.icon className="mr-2" />
                  {item.name}
                  {item.name === 'Notifications' && notifications.length > 0 && (
                    <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs ml-2">
                      {notifications.length}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <button onClick={handleLogout} className="flex items-center text-gray-300 hover:text-white mt-auto transition-colors duration-200">
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
        return <Notifications />;
      default:
        return null;
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
