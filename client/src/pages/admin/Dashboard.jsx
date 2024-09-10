import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaUtensils, FaClipboardList, FaChartLine, FaTachometerAlt, FaList, FaCog, FaSignOutAlt, FaBell, FaShoppingCart, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Reports from '../../components/admin/Reports';
import Reservations from '../../components/admin/Reservations';
import MenuItems from '../../components/admin/MenuItems';
import Orders from '../../components/admin/Orders';
import Users from '../../components/admin/Users';
import Notifications from '../../components/admin/Notifications';
import { db } from '../../firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [stats, setStats] = useState({
    dailySales: 0,
    dailyOrders: 0,
    dailyAC: 0,
    totalRamenQty: 0,
    totalAppetizersQty: 0,
    totalSideDishesQty: 0,
    totalDessertsQty: 0,
    totalDrinksQty: 0
  });
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const today = new Date();
        
        // Fetch daily data
        const dailySummaryRef = doc(db, 'DailySummary', today.toISOString().split('T')[0]);
        const dailySummarySnap = await getDoc(dailySummaryRef);
        
        let dailyData = {};
        if (dailySummarySnap.exists()) {
          dailyData = dailySummarySnap.data();
        }
        
        const newStats = {
          dailySales: dailyData.totalSales || 0,
          dailyOrders: dailyData.totalOrdersQty || 0,
          dailyAC: dailyData.totalOrdersQty > 0 ? dailyData.totalSales / dailyData.totalOrdersQty : 0,
          totalRamenQty: dailyData.totalRamenQty || 0,
          totalAppetizersQty: dailyData.totalAppetizersQty || 0,
          totalSideDishesQty: dailyData.totalSideDishesQty || 0,
          totalDessertsQty: dailyData.totalDessertsQty || 0,
          totalDrinksQty: dailyData.totalDrinksQty || 0
        };
        
        setStats(newStats);
        
        // Update product data for chart
        setProductData([
          { name: 'Ramen', quantity: newStats.totalRamenQty },
          { name: 'Appetizers', quantity: newStats.totalAppetizersQty },
          { name: 'Side Dishes', quantity: newStats.totalSideDishesQty },
          { name: 'Desserts', quantity: newStats.totalDessertsQty },
          { name: 'Drinks', quantity: newStats.totalDrinksQty },
        ]);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
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

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/admin-login');
    } catch (error) {
      toast.error('Failed to log out');
    }
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard title="Daily Sales" value={`$${stats.dailySales.toLocaleString()}`} icon={<FaDollarSign />} />
              <StatCard title="Daily Orders" value={stats.dailyOrders.toLocaleString()} icon={<FaClipboardList />} />
              <StatCard title="Daily AC" value={`$${stats.dailyAC.toFixed(2)}`} icon={<FaChartLine />} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
              <StatCard title="Total Ramen" value={stats.totalRamenQty.toLocaleString()} icon={<FaUtensils />} />
              <StatCard title="Total Appetizers" value={stats.totalAppetizersQty.toLocaleString()} icon={<FaList />} />
              <StatCard title="Total Side Dishes" value={stats.totalSideDishesQty.toLocaleString()} icon={<FaList />} />
              <StatCard title="Total Desserts" value={stats.totalDessertsQty.toLocaleString()} icon={<FaList />} />
              <StatCard title="Total Drinks" value={stats.totalDrinksQty.toLocaleString()} icon={<FaList />} />
            </div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md mb-8"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-bold mb-4">Product Quantity Chart</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantity" fill="#8884d8" />
                </BarChart>
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
