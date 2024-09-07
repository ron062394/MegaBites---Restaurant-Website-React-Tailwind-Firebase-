import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaPlus, FaSearch, FaSort } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      // Simulating API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockReports = [
        { id: 1, name: 'Sales Report', description: 'Monthly sales overview', lastUpdated: '2023-05-15' },
        { id: 2, name: 'Inventory Report', description: 'Current stock levels', lastUpdated: '2023-05-14' },
        { id: 3, name: 'Customer Feedback', description: 'Summary of recent reviews', lastUpdated: '2023-05-13' },
        { id: 4, name: 'Financial Statement', description: 'Quarterly financial summary', lastUpdated: '2023-05-12' },
        { id: 5, name: 'Employee Performance', description: 'Staff productivity metrics', lastUpdated: '2023-05-11' },
        { id: 6, name: 'Marketing Campaign Results', description: 'ROI of recent campaigns', lastUpdated: '2023-05-10' },
      ];
      setReports(mockReports);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch reports');
      setLoading(false);
      toast.error('Failed to fetch reports. Please try again.');
    }
  };

  const handleDownloadReport = (id) => {
    toast.info(`Downloading report ${id}`);
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

  const sortedReports = React.useMemo(() => {
    let sortableReports = [...reports];
    if (sortConfig.key !== null) {
      sortableReports.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableReports;
  }, [reports, sortConfig]);

  const filteredReports = sortedReports.filter(report => 
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description.toLowerCase().includes(searchTerm.toLowerCase())
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
        Reports Management
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
            placeholder="Search reports..."
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
              <th className="p-3 cursor-pointer" onClick={() => requestSort('name')}>
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th className="p-3">Description</th>
              <th className="p-3 cursor-pointer" onClick={() => requestSort('lastUpdated')}>
                Last Updated {sortConfig.key === 'lastUpdated' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <motion.tr
                key={report.id}
                className="border-b border-gray-200 hover:bg-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td className="p-3">{report.name}</td>
                <td className="p-3">{report.description}</td>
                <td className="p-3">{new Date(report.lastUpdated).toLocaleDateString()}</td>
                <td className="p-3">
                  <motion.button
                    className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 shadow-lg"
                    onClick={() => handleDownloadReport(report.id)}
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
