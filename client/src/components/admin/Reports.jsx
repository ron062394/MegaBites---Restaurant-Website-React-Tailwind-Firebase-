import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
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
    }
  };

  const handleDownloadReport = (id) => {
    // Implement download report functionality
    toast.info(`Downloading report ${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        Reports
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        {reports.map((report) => (
          <motion.div
            key={report.id}
            className="bg-white rounded-lg shadow-md p-4"
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="text-xl font-semibold mb-2">{report.name}</h2>
            <p className="text-gray-600 mb-2">{report.description}</p>
            <p className="text-sm text-gray-500 mb-4">
              Last updated: {new Date(report.lastUpdated).toLocaleDateString()}
            </p>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                onClick={() => handleDownloadReport(report.id)}
              >
                <FaDownload className="mr-2" /> Download
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default Reports;
