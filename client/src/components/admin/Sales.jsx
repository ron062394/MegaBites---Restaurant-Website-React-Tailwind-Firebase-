import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaSort, FaDownload } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy, startAfter, limit } from 'firebase/firestore';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async (loadMore = false) => {
    try {
      setLoading(true);
      let salesQuery = query(collection(db, 'Sales'), orderBy(sortConfig.key, sortConfig.direction), limit(10));

      if (loadMore && lastVisible) {
        salesQuery = query(salesQuery, startAfter(lastVisible));
      }

      const snapshot = await getDocs(salesQuery);
      
      if (snapshot.empty) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const fetchedSales = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate().toLocaleDateString()
      }));

      setSales(prevSales => loadMore ? [...prevSales, ...fetchedSales] : fetchedSales);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching sales:', err);
      setError('Failed to fetch sales');
      setLoading(false);
      toast.error('Failed to fetch sales. Please try again.');
    }
  };

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
    fetchSales();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSales = sales.filter(sale =>
    sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoadMore = () => {
    fetchSales(true);
  };

  const handleDownloadReport = () => {
    // Implement report download logic here
    toast.info('Downloading sales report...');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h2
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="text-3xl font-bold mb-6"
      >
        Sales
      </motion.h2>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="mb-4 flex justify-between items-center"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search sales..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <button
          onClick={handleDownloadReport}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 flex items-center"
        >
          <FaDownload className="mr-2" /> Download Report
        </button>
      </motion.div>

      {loading ? (
        <p>Loading sales data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <button onClick={() => handleSort('id')} className="flex items-center">
                    Order ID <FaSort className="ml-1" />
                  </button>
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <button onClick={() => handleSort('customerName')} className="flex items-center">
                    Customer Name <FaSort className="ml-1" />
                  </button>
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <button onClick={() => handleSort('total')} className="flex items-center">
                    Total <FaSort className="ml-1" />
                  </button>
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <button onClick={() => handleSort('date')} className="flex items-center">
                    Date <FaSort className="ml-1" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale) => (
                <tr key={sale.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{sale.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{sale.customerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${sale.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{sale.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {hasMore && (
            <div className="mt-4 text-center">
              <button
                onClick={handleLoadMore}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Load More
              </button>
            </div>
          )}
        </motion.div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Sales;
