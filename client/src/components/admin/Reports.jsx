import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaPlus, FaSearch, FaSort } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';

const Reports = () => {
  const [dailySummaries, setDailySummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    fetchDailySummaries();
  }, []);

  const fetchDailySummaries = async () => {
    try {
      const summariesRef = collection(db, 'DailySummary');
      const q = query(summariesRef, orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      const summariesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDailySummaries(summariesData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching daily summaries:', err);
      setError('Failed to fetch daily summaries');
      setLoading(false);
      toast.error('Failed to fetch daily summaries. Please try again.');
    }
  };

  const handleDownloadReport = (date) => {
    toast.info(`Downloading report for ${date}`);
  };

  const handleAddReport = () => {
    toast.info('Add report functionality to be implemented');
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedSummaries = React.useMemo(() => {
    let sortableSummaries = [...dailySummaries];
    if (sortConfig.key !== null) {
      sortableSummaries.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableSummaries;
  }, [dailySummaries, sortConfig]);

  const filteredSummaries = sortedSummaries.filter(summary => 
    summary.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        Daily Sales Summaries
      </motion.h1>
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center mb-6"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <motion.button
          className="bg-gray-700 text-white px-6 py-3 rounded-full mb-4 md:mb-0 flex items-center justify-center hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 shadow-lg"
          onClick={handleAddReport}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlus className="mr-2" /> Add New Report
        </motion.button>
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by date..."
            className="pl-10 pr-4 py-3 rounded-full shadow appearance-none border w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-800">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 cursor-pointer" onClick={() => requestSort('date')}>
                Date {sortConfig.key === 'date' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th className="p-3 cursor-pointer" onClick={() => requestSort('totalSales')}>
                Total Sales {sortConfig.key === 'totalSales' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th className="p-3 cursor-pointer" onClick={() => requestSort('totalOrdersQty')}>
                Total Orders {sortConfig.key === 'totalOrdersQty' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th className="p-3">Ramen Qty</th>
              <th className="p-3">Side Dishes Qty</th>
              <th className="p-3">Appetizers Qty</th>
              <th className="p-3">Desserts Qty</th>
              <th className="p-3">Drinks Qty</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSummaries.map((summary) => (
              <motion.tr
                key={summary.id}
                className="border-b border-gray-200 hover:bg-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td className="p-3">{summary.date}</td>
                <td className="p-3">${summary.totalSales.toFixed(2)}</td>
                <td className="p-3">{summary.totalOrdersQty}</td>
                <td className="p-3">{summary.totalRamenQty}</td>
                <td className="p-3">{summary.totalSideDishesQty}</td>
                <td className="p-3">{summary.totalAppetizersQty}</td>
                <td className="p-3">{summary.totalDessertsQty}</td>
                <td className="p-3">{summary.totalDrinksQty}</td>
                <td className="p-3">
                  <motion.button
                    className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 shadow-lg"
                    onClick={() => handleDownloadReport(summary.date)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaDownload className="mr-2 inline" /> Download
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default Reports;
