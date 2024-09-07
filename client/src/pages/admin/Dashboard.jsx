import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaUtensils, FaClipboardList, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalMenuItems: 0,
    revenue: 0
  });

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
          revenue: 98765
        });
      }, 1000);
    };

    fetchStats();
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

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold text-gray-800 mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        Admin Dashboard
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers} icon={<FaUsers />} />
        <StatCard title="Total Orders" value={stats.totalOrders} icon={<FaClipboardList />} />
        <StatCard title="Menu Items" value={stats.totalMenuItems} icon={<FaUtensils />} />
        <StatCard title="Revenue" value={`$${stats.revenue.toLocaleString()}`} icon={<FaChartLine />} />
      </div>
    </div>
  );
};

export default Dashboard;
